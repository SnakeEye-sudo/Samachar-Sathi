import { DailyNews, NewsUnit } from '@/types/news';

const SAMACHAR_SHEET_ID = '1doQbZwp-vdiDbWdgKNW9rnSxL8q08OMIY9gUM14liD0';
const SAMACHAR_SHEET_NAME = 'Sheet1';
const REQUEST_TIMEOUT_MS = 10000;

interface GoogleSheetColumn {
  label?: string;
}

interface GoogleSheetCell {
  v?: string | number | boolean | null;
  f?: string | null;
}

interface GoogleSheetRow {
  c: Array<GoogleSheetCell | null>;
}

interface GoogleSheetResponse {
  status: string;
  table?: {
    cols: GoogleSheetColumn[];
    rows: GoogleSheetRow[];
  };
}

interface ParsedNewsRow {
  date: string;
  category: string;
  categoryDescription?: string;
  item: NewsUnit;
  primaryLanguage: string;
  generatedAt: string;
  sortOrder: number;
}

const normalizeHeader = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

const normalizeText = (value: unknown) => String(value ?? '').trim();

const getSheetUrl = () =>
  `https://docs.google.com/spreadsheets/d/${SAMACHAR_SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SAMACHAR_SHEET_NAME)}`;

const loadGoogleSheet = async (): Promise<GoogleSheetResponse> => {
  if (typeof window === 'undefined' || !document.body) {
    throw new Error('Google Sheet loader requires a browser context.');
  }

  return new Promise((resolve, reject) => {
    const callbackName = `__samacharSheetCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const win = window as unknown as Record<string, unknown>;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      delete win[callbackName];
      script.remove();
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('Samachar Google Sheet request timed out.'));
    }, REQUEST_TIMEOUT_MS);

    win[callbackName] = (payload: GoogleSheetResponse) => {
      cleanup();
      if (payload.status !== 'ok' || !payload.table) {
        reject(new Error('Samachar Google Sheet returned an invalid response.'));
        return;
      }
      resolve(payload);
    };

    script.async = true;
    script.onerror = () => {
      cleanup();
      reject(new Error('Samachar Google Sheet script could not be loaded.'));
    };
    script.src = `${getSheetUrl()}&tqx=out:json;responseHandler:${callbackName}&ts=${Date.now()}`;
    document.body.appendChild(script);
  });
};

const getCellValue = (cell: GoogleSheetCell | null | undefined) => {
  if (!cell) return '';
  if (typeof cell.v === 'number') return cell.v;
  if (typeof cell.v === 'boolean') return cell.v ? 'true' : 'false';
  return normalizeText(cell.v ?? cell.f ?? '');
};

const buildRowRecord = (headers: string[], row: GoogleSheetRow) => {
  const record: Record<string, string | number> = {};

  headers.forEach((header, index) => {
    if (!header) return;
    const value = getCellValue(row.c[index]);
    if (value === '') return;
    record[header] = value;
  });

  return record;
};

const getString = (record: Record<string, string | number>, ...keys: string[]) => {
  for (const key of keys) {
    const value = record[normalizeHeader(key)];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }
  return '';
};

const getNumber = (record: Record<string, string | number>, ...keys: string[]) => {
  const raw = getString(record, ...keys);
  if (!raw) return Number.MAX_SAFE_INTEGER;
  const parsed = Number(String(raw).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
};

const mapRecordToNewsRow = (record: Record<string, string | number>): ParsedNewsRow | null => {
  const date = getString(record, 'date');
  const category = getString(record, 'category');
  const titleEn = getString(record, 'titleEn', 'title_en');
  const titleHi = getString(record, 'titleHi', 'title_hi') || titleEn;

  if (!date || !category || (!titleEn && !titleHi)) {
    return null;
  }

  return {
    date,
    category,
    categoryDescription: getString(record, 'categoryDescription', 'category_description') || undefined,
    primaryLanguage: getString(record, 'primaryLanguage', 'primary_language') || 'en',
    generatedAt: getString(record, 'generatedAt', 'generated_at') || new Date().toISOString(),
    sortOrder: getNumber(record, 'sortOrder', 'sort_order'),
    item: {
      title: {
        en: titleEn || titleHi,
        hi: titleHi || titleEn,
      },
      link: getString(record, 'link'),
      source: getString(record, 'source'),
      analysis: {
        en: getString(record, 'analysisEn', 'analysis_en'),
        hi: getString(record, 'analysisHi', 'analysis_hi') || getString(record, 'analysisEn', 'analysis_en'),
      },
      upscContext: {
        relevance: {
          en: getString(record, 'relevanceEn', 'relevance_en'),
          hi: getString(record, 'relevanceHi', 'relevance_hi') || getString(record, 'relevanceEn', 'relevance_en'),
        },
        ...(getString(record, 'staticLinkageEn', 'static_linkage_en') || getString(record, 'staticLinkageHi', 'static_linkage_hi')
          ? {
              staticLinkage: {
                en: getString(record, 'staticLinkageEn', 'static_linkage_en'),
                hi: getString(record, 'staticLinkageHi', 'static_linkage_hi') || getString(record, 'staticLinkageEn', 'static_linkage_en'),
              },
            }
          : {}),
        ...(getString(record, 'concernsEn', 'concerns_en') || getString(record, 'concernsHi', 'concerns_hi')
          ? {
              concerns: {
                en: getString(record, 'concernsEn', 'concerns_en'),
                hi: getString(record, 'concernsHi', 'concerns_hi') || getString(record, 'concernsEn', 'concerns_en'),
              },
            }
          : {}),
      },
    },
  };
};

export const fetchAnalysisByDateFromGoogleSheet = async (date: string): Promise<DailyNews | null> => {
  const response = await loadGoogleSheet();
  const headers = response.table?.cols.map(col => normalizeHeader(col.label || '')) ?? [];

  if (headers.every(header => !header)) {
    return null;
  }

  const rows = (response.table?.rows ?? [])
    .map(row => buildRowRecord(headers, row))
    .map(mapRecordToNewsRow)
    .filter((row): row is ParsedNewsRow => row !== null)
    .filter(row => row.date === date)
    .sort((left, right) => left.sortOrder - right.sortOrder);

  if (rows.length === 0) {
    return null;
  }

  const categories = new Map<string, { name: string; description?: string; news: NewsUnit[] }>();

  rows.forEach(row => {
    const current = categories.get(row.category) ?? {
      name: row.category,
      description: row.categoryDescription,
      news: [],
    };

    if (!current.description && row.categoryDescription) {
      current.description = row.categoryDescription;
    }

    current.news.push(row.item);
    categories.set(row.category, current);
  });

  return {
    metadata: {
      date,
      totalArticlesAnalyzed: rows.length,
      generatedAt: rows[0]?.generatedAt || new Date().toISOString(),
      primaryLanguage: rows[0]?.primaryLanguage || 'en',
    },
    categories: Array.from(categories.values()),
  };
};
