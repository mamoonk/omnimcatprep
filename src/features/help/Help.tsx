import { Link } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import { Card } from "../../components/Card";

function HelpSection({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Card hover={false} delay={delay} className="!p-5">
      <h2 className="mb-3 text-lg font-semibold text-[#003366]">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </Card>
  );
}

function HelpLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="font-medium text-[#003366] underline hover:text-[#3399ff]">
      {children}
    </Link>
  );
}

export function Help() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <PageHeader
        title="Help & User Guide"
        subtitle="Everything you need to practice MCAT questions offline, review flashcards, and track progress."
      />

      <HelpSection title="Getting started" delay={50}>
        <p>
          MCAT Prep runs entirely on your device. Your practice data is stored locally and works
          without an internet connection. On first launch, the app initializes a local database and
          loads sample questions and flashcards.
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Start on the <HelpLink to="/">Home</HelpLink> page to confirm the database is ready.
          </li>
          <li>
            Open <HelpLink to="/exam">Exam</HelpLink> to begin a practice session.
          </li>
          <li>
            Check <HelpLink to="/dashboard">Dashboard</HelpLink> after answering questions to see
            your stats.
          </li>
        </ol>
      </HelpSection>

      <HelpSection title="Exam practice (Pearson VUE emulator)" delay={100}>
        <p>
          The exam screen mimics the Pearson VUE testing interface with a split layout: passage on
          the left, question and answer choices on the right.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Select an answer</strong> — Click a choice (A–D), then press{" "}
            <strong>Submit Answer</strong>.
          </li>
          <li>
            <strong>Cross out choices</strong> — Use &quot;Cross out&quot; under any option to
            strike through distractors you have eliminated.
          </li>
          <li>
            <strong>Flag questions</strong> — Click <strong>Flag</strong> to mark a question for
            later review.
          </li>
          <li>
            <strong>Highlight passage text</strong> — Select text in the passage, then click{" "}
            <strong>Highlight</strong>.
          </li>
          <li>
            <strong>Scratchpad</strong> — Use the markdown notepad at the bottom of the question
            pane for quick notes.
          </li>
          <li>
            <strong>Section timer</strong> — The countdown in the header tracks remaining section
            time.
          </li>
          <li>
            <strong>Navigate</strong> — Use Previous / Submit Answer to move between questions.
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="Guarantee Mode" delay={150}>
        <p>
          Guarantee Mode enforces deep review when you miss a question. Toggle it on in the exam
          header before or during a session.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>When active, an incorrect answer opens a mandatory analysis modal.</li>
          <li>
            You must fill in all three fields before continuing:
            <ul className="mt-1 list-disc pl-5">
              <li>
                <strong>Information Gap</strong> — What concept did you not know?
              </li>
              <li>
                <strong>Distractor Trap</strong> — Why did the wrong answer seem appealing?
              </li>
              <li>
                <strong>Preventive Rule</strong> — What rule will prevent this mistake next time?
              </li>
            </ul>
          </li>
          <li>Your analysis is saved to your local question log for later review.</li>
          <li>
            With Guarantee Mode on, the local AI tutor may also generate a rationale for incorrect
            answers (shown in a panel at the bottom-right).
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="Flashcards (FSRS spaced repetition)" delay={200}>
        <p>
          Flashcards use the Free Spaced Repetition Scheduler (FSRS) to schedule reviews based on
          how well you recall each card.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Open <HelpLink to="/flashcards">Flashcards</HelpLink> to review cards that are due
            today.
          </li>
          <li>Click <strong>Show Answer</strong>, then rate your recall:</li>
          <ul className="list-disc pl-5">
            <li>
              <strong>Again</strong> — You forgot; card resets with a shorter interval.
            </li>
            <li>
              <strong>Hard</strong> — Partial recall; modest interval increase.
            </li>
            <li>
              <strong>Good</strong> — Solid recall; standard interval increase.
            </li>
            <li>
              <strong>Easy</strong> — Effortless recall; longest interval increase.
            </li>
          </ul>
          <li>
            <strong>Overdue guard:</strong> If more than 200 flashcards are overdue, new exam
            practice is blocked until you catch up on reviews. Check the Home page for your overdue
            count.
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="AI Tutor &amp; PDF import" delay={250}>
        <p>
          The AI Tutor supports local offline models (WebGPU) and online providers you connect
          with your own API key.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Go to <HelpLink to="/ai">AI Tutor</HelpLink> or{" "}
            <HelpLink to="/settings">Settings</HelpLink> and pick a provider: Local,
            OpenAI, Anthropic, Google Gemini, Groq, or OpenRouter.
          </li>
          <li>
            Choose a model for that provider. Online providers open an API key / token dialog when
            selected — keys are stored only on this device.
          </li>
          <li>
            For <strong>Local</strong>, save your choice and click <strong>Load Model</strong>.
            The model downloads from Hugging Face once, then runs offline.
          </li>
          <li>
            For <strong>online</strong> providers, click <strong>Test Generation</strong> after
            saving your key.
          </li>
          <li>
            During exam practice with Guarantee Mode, incorrect answers automatically trigger AI
            rationale generation.
          </li>
          <li>
            <strong>PDF → Cloze flashcards:</strong> Upload a PDF on the AI Tutor page. The app
            extracts text and creates Cloze-deletion flashcards, which appear in your flashcard
            review queue.
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="Dashboard &amp; analytics" delay={300}>
        <p>
          The <HelpLink to="/dashboard">Dashboard</HelpLink> shows your practice performance from
          locally stored question logs:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Total attempts, overall accuracy, and average time per question</li>
          <li>Daily practice volume, day streak, and rolling accuracy trend</li>
          <li>Accuracy and attempt volume by MCAT section</li>
          <li>Incorrect-answer type breakdown (Guarantee Mode)</li>
          <li>Flashcard deck stats: due cards, FSRS state, stability, and lapses</li>
        </ul>
        <p className="text-gray-500">
          All analytics are computed locally — no network required.
        </p>
      </HelpSection>

      <HelpSection title="Offline use &amp; cloud sync" delay={350}>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Offline-first:</strong> Practice, flashcards, and analytics work without
            internet.
          </li>
          <li>
            <strong>Optional Supabase sync:</strong> If cloud credentials are configured, your data
            syncs when you are signed in and online. Without credentials, the app skips sync
            entirely.
          </li>
          <li>
            Data persists across sessions in your browser or desktop app storage.
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="Keyboard &amp; tips" delay={400}>
        <ul className="list-disc space-y-1 pl-5">
          <li>Work through flagged questions by noting which items you marked during the session.</li>
          <li>
            Enable Guarantee Mode when you want enforced mistake analysis — ideal for content review
            days.
          </li>
          <li>
            Keep overdue flashcards under 200 to avoid being blocked from new passage practice.
          </li>
          <li>
            Use the scratchpad to jot elimination notes — it supports plain markdown formatting.
          </li>
        </ul>
      </HelpSection>

      <HelpSection title="Quick reference" delay={450}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 pr-4 font-semibold">Page</th>
              <th className="py-2 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/">Home</HelpLink>
              </td>
              <td className="py-2">Status, overdue count, sync info</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/exam">Exam</HelpLink>
              </td>
              <td className="py-2">Full-screen MCAT practice</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/flashcards">Flashcards</HelpLink>
              </td>
              <td className="py-2">FSRS review queue</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/dashboard">Dashboard</HelpLink>
              </td>
              <td className="py-2">Performance charts</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/ai">AI Tutor</HelpLink>
              </td>
              <td className="py-2">Local AI + PDF import</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">
                <HelpLink to="/help">Help</HelpLink>
              </td>
              <td className="py-2">This guide</td>
            </tr>
          </tbody>
        </table>
      </HelpSection>
    </div>
  );
}
