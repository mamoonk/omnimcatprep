interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  delay?: number;
}

export function Card({
  children,
  className = "",
  hover = true,
  animate = true,
  delay = 0,
}: CardProps) {
  const animClass = animate ? "animate-fade-in-up" : "";
  const cardClass = hover ? "glass-card" : "glass-card-static";
  return (
    <div
      className={`rounded-2xl p-5 ${cardClass} ${animClass} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
