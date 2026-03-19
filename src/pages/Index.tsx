import AppLayout from '@/components/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-14">
        <section className="rounded-[2rem] border border-accent/20 bg-gradient-to-br from-background via-background to-accent/10 shadow-2xl overflow-hidden">
          <div className="px-6 py-10 sm:px-10 sm:py-14 text-center">
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-accent">
              Work In Progress
            </div>

            <h2 className="mt-6 text-3xl sm:text-5xl font-display font-black tracking-tight text-foreground leading-tight">
              Samachar Sathi is currently under development and will be live soon.
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-lg text-muted-foreground leading-relaxed">
              We are actively refining the product experience and preparing the platform for launch.
              Thank you for your patience while the final updates are being completed.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left">
              {[
                'The interface is being polished for a smoother launch experience.',
                'Content structure and publishing workflows will be introduced in the next release stage.',
                'A fully live version will be made available here shortly.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-border/70 bg-card/80 px-4 py-4 text-sm text-muted-foreground shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
