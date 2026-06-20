import { Link, useLocation } from "react-router-dom";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/exam", label: "Exam" },
  { to: "/practice", label: "Practice" },
  { to: "/lessons", label: "Lessons" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/ai", label: "AI Tutor" },
  { to: "/help", label: "Help" },
  { to: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="app-bg min-h-screen">
      <nav className="nav-glass sticky top-0 z-40 flex items-center gap-1 px-4 py-3 md:gap-2 md:px-6">
        <Link to="/" className="mr-2 flex items-center gap-2 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3399ff] to-[#06b6d4] text-sm font-black text-white shadow-lg">
            M
          </span>
          <span className="hidden font-bold text-white sm:inline">MCAT Prep</span>
        </Link>
        <div className="flex flex-1 flex-wrap items-center gap-0.5 md:gap-1">
          {NAV.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
      <main key={location.pathname} className="animate-fade-in mx-auto max-w-5xl p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
