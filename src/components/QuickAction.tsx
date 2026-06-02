import { Link } from "react-router-dom";

interface QuickActionProps {
  to: string;
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export function QuickAction({ to, icon, title, description, delay = 0 }: QuickActionProps) {
  return (
    <Link
      to={to}
      className="glass-card animate-fade-in-up group block rounded-2xl p-5 no-underline"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="quick-action-icon mb-3">{icon}</div>
      <h3 className="font-semibold text-[#003366] transition-colors group-hover:text-[#3399ff]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </Link>
  );
}
