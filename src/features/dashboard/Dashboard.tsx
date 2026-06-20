import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
} from "recharts";
import { getDatabase } from "../../database";
import type { Flashcard, QuestionLog } from "../../types";
import type { Attempt } from "../../types/attempt";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";
import {
  CHART_COLORS,
  computeFlashcardAnalytics,
  computePracticeAnalytics,
  computeCategoryAnalytics,
  attemptsToLogs,
} from "./analytics";
import { getCategoryById } from "../../data/aamc-taxonomy";
const tooltipStyle = {
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 8px 24px rgba(0,51,102,0.12)",
};
export function Dashboard() {
  const [logs, setLogs] = useState<QuestionLog[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  useEffect(() => {
    let cancelled = false;
    void getDatabase().then(async (db) => {
      const [logDocs, cardDocs, attemptDocs] = await Promise.all([
        db.question_logs.find().exec(),
        db.flashcards.find().exec(),
        db.attempts.find().exec(),
      ]);
      if (!cancelled) {
        setLogs(logDocs.map((d) => d.toJSON()));
        setFlashcards(cardDocs.map((d) => d.toJSON()));
        setAttempts(attemptDocs.map((d) => d.toJSON()));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const unifiedLogs = useMemo(() => [...logs, ...attemptsToLogs(attempts)], [logs, attempts]);
  const practice = useMemo(() => computePracticeAnalytics(unifiedLogs), [unifiedLogs]);
  const deck = useMemo(() => computeFlashcardAnalytics(flashcards), [flashcards]);
  const categoryStats = useMemo(() => computeCategoryAnalytics(attempts, getCategoryById), [attempts]);
  const sectionAccuracy = practice.sectionStats.filter((s) => s.total > 0);
  const skillAccuracy = practice.skillBreakdown.filter((s) => s.total > 0);
  return (
    <div>
      <PageHeader
        title="Performance Dashboard"
        subtitle="Practice trends, mistake patterns, and flashcard deck health — all computed on-device."
      />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Attempts" value={String(practice.totalAttempts)} delay={50} />
        <StatCard
          label="Overall Accuracy"
          value={practice.accuracyPct !== null ? `${practice.accuracyPct}%` : "—"}
          delay={75}
        />
        <StatCard label="Avg Time / Q" value={`${practice.avgTimeSeconds}s`} delay={100} />
        <StatCard label="Today" value={String(practice.attemptsToday)} delay={125} />
        <StatCard label="Day Streak" value={String(practice.activeDayStreak)} delay={150} />
        <StatCard label="Mistakes Logged" value={String(practice.complianceCount)} delay={175} />
      </div>
      {practice.weakestSection && practice.totalAttempts >= 3 && (
        <Card delay={180} hover={false} className="mb-6 border border-amber-200/60 bg-amber-50/40">
          <div className="text-sm text-amber-900">
            <p className="mb-2">
              <span className="font-semibold">Weakest section:</span>{" "}
              {practice.weakestSection.label} at {practice.weakestSection.accuracy}% accuracy (
              {practice.weakestSection.total} attempts, avg {practice.weakestSection.avgTimeSeconds}s
              / question).
            </p>
            {categoryStats.length > 0 && (
              <>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Bottom categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...categoryStats]
                    .sort((a, b) => a.accuracy - b.accuracy)
                    .slice(0, 3)
                    .map((cat) => (
                      <span
                        key={cat.categoryId}
                        className="rounded-lg bg-amber-100/60 px-2.5 py-1 text-xs text-amber-800"
                        title={`${cat.correct}/${cat.total} correct`}
                      >
                        {cat.label}: {cat.accuracy}%
                      </span>
                    ))}
                </div>
              </>
            )}
          </div>
        </Card>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Daily Practice (14 days)" delay={200}>
          {practice.totalAttempts === 0 ? (
            <EmptyChart message="Complete exam questions to see daily activity." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={practice.dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,51,102,0.08)" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  yAxisId="left"
                  dataKey="attempts"
                  name="Attempts"
                  fill="url(#dailyBarGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  name="Accuracy %"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                />
                <defs>
                  <linearGradient id="dailyBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3399ff" />
                    <stop offset="100%" stopColor="#003366" />
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Accuracy Trend" delay={225}>
          {practice.accuracyTrend.length === 0 ? (
            <EmptyChart message="Your rolling accuracy appears after the first attempt." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={practice.accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,51,102,0.08)" />
                <XAxis dataKey="index" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rollingAccuracy"
                  name="Last 5 questions"
                  stroke="#3399ff"
                  strokeWidth={2.5}
                  dot={{ fill: "#3399ff", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeAccuracy"
                  name="All-time"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Accuracy by Section" delay={250}>
          {sectionAccuracy.length === 0 ? (
            <EmptyChart message="Section breakdown appears once you answer questions." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={sectionAccuracy}>
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value, name) => {
                    if (name === "accuracy") return [`${value}%`, "Accuracy"];
                    return [value, name];
                  }}
                />
                <Bar dataKey="accuracy" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3399ff" />
                    <stop offset="100%" stopColor="#003366" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Attempts by Section" delay={275}>
          {practice.sectionVolume.length === 0 ? (
            <EmptyChart message="Volume chart fills in as you practice each section." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={practice.sectionVolume}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={88}
                  label={({ label, count }) => `${label}: ${count}`}
                >
                  {practice.sectionVolume.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Time per Question" delay={300}>
          {practice.timeTrend.length === 0 ? (
            <EmptyChart message="Timing data is recorded for each submitted answer." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={practice.timeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,51,102,0.08)" />
                <XAxis dataKey="index" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="seconds"
                  stroke="#3399ff"
                  strokeWidth={2.5}
                  dot={{ fill: "#3399ff", r: 4 }}
                  activeDot={{ r: 6, fill: "#06b6d4" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Incorrect Answer Types" delay={325}>
          {practice.errorBreakdown.length === 0 ? (
            <EmptyChart message="Error types are captured when you miss a question in Guarantee Mode." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={practice.errorBreakdown}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {practice.errorBreakdown.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
        <ChartCard title="Performance by Skill" delay={350}>
          {skillAccuracy.length === 0 ? (
            <EmptyChart message="Skill breakdown appears once you answer questions with recorded skill types." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={skillAccuracy} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,51,102,0.08)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value, name) => {
                    if (name === "accuracy") return [`${value}% (${skillAccuracy.find((s) => s.label === value)?.correct ?? 0}/${skillAccuracy.find((s) => s.label === value)?.total ?? 0} correct)`, "Accuracy"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => {
                    const stat = skillAccuracy.find((s) => s.label === label);
                    return stat ? `${stat.label}: ${stat.correct}/${stat.total} correct` : label;
                  }}
                />
                <Bar dataKey="accuracy" fill="url(#skillGradient)" radius={[0, 6, 6, 0]} name="accuracy">
                  {skillAccuracy.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3399ff" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#003366]">Flashcard Deck</h2>
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total Cards" value={String(deck.totalCards)} delay={350} compact />
          <StatCard label="Due Now" value={String(deck.dueNow)} delay={375} compact />
          <StatCard label="Total Reviews" value={String(deck.totalReps)} delay={400} compact />
          <StatCard
            label="Avg Stability"
            value={deck.totalCards > 0 ? String(deck.avgStability) : "—"}
            delay={425}
            compact
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Cards by FSRS State" delay={450}>
            {deck.byState.length === 0 ? (
              <EmptyChart message="Import or review flashcards to populate deck analytics." />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={deck.byState} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
          <Card delay={475} hover={false} className="flex flex-col justify-center">
            <h3 className="mb-3 font-semibold text-[#003366]">Deck Summary</h3>
            <dl className="space-y-2 text-sm">
              <SummaryRow label="Overdue cards" value={String(deck.overdueCount)} />
              <SummaryRow label="Total lapses" value={String(deck.totalLapses)} />
              <SummaryRow
                label="Avg difficulty"
                value={deck.totalCards > 0 ? String(deck.avgDifficulty) : "—"}
              />
              <SummaryRow label="This week (questions)" value={String(practice.attemptsThisWeek)} />
              <SummaryRow
                label="Correct / incorrect"
                value={`${practice.correctCount} / ${practice.incorrectCount}`}
              />
            </dl>
          </Card>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#003366]">Content Category Breakdown</h2>
        {categoryStats.length === 0 ? (
          <Card hover={false}>
            <p className="py-8 text-center text-sm text-slate-500">
              Practice questions appear here after you answer them in the Practice or Exam screens.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryStats.slice(0, 12).map((stat) => (
              <Card key={stat.categoryId} hover={false} className="!p-4">
                <p className="mb-1 truncate text-xs font-medium text-slate-500" title={stat.label}>
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#003366]">{stat.accuracy}%</p>
                <p className="text-xs text-slate-400">{stat.correct}/{stat.total} correct</p>
              </Card>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
function ChartCard({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Card delay={delay} hover={false}>
      <h3 className="mb-4 font-semibold text-[#003366]">{title}</h3>
      {children}
    </Card>
  );
}
function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-[240px] items-center justify-center rounded-xl bg-slate-50 px-6 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}
function StatCard({
  label,
  value,
  delay,
  compact,
}: {
  label: string;
  value: string;
  delay: number;
  compact?: boolean;
}) {
  return (
    <Card delay={delay} className="text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-2 font-extrabold text-[#003366] ${compact ? "text-2xl" : "text-3xl"}`}>
        {value}
      </p>
    </Card>
  );
}
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-2 last:border-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-800">{value}</dd>
    </div>
  );
}
