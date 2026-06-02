interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="animate-fade-in-up mb-8">
      <h1 className="hero-gradient-text text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-base text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}
