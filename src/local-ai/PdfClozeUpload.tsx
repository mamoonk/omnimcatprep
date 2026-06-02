import { useCallback, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../components/Card";
import { getDatabase } from "../database";
import type { Flashcard } from "../types";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function extractClozeCards(text: string): Pick<Flashcard, "front" | "back">[] {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20)
    .slice(0, 10);

  return sentences.map((sentence) => {
    const words = sentence.split(/\s+/);
    const target = words[Math.floor(words.length / 2)] ?? "term";
    const clozeFront = sentence.replace(
      target,
      `{{c1::${target}}}`,
    );
    return {
      front: clozeFront,
      back: target,
    };
  });
}

export function PdfClozeUpload() {
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setBusy(true);
    setStatus("Parsing PDF...");
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        fullText += "\n";
      }

      const clozeCards = extractClozeCards(fullText);
      const db = await getDatabase();
      const now = Date.now();
      const docs: Flashcard[] = clozeCards.map((c) => ({
        id: uuidv4(),
        front: c.front,
        back: c.back,
        stability: 1,
        difficulty: 5,
        elapsedDays: 0,
        scheduledDays: 1,
        reps: 0,
        lapses: 0,
        state: 0,
        dueDate: now,
      }));

      await db.flashcards.bulkInsert(docs);
      setStatus(`Created ${docs.length} Cloze flashcards from PDF.`);
    } catch (err) {
      setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <Card hover={false}>
      <h3 className="mb-3 font-semibold text-[#003366]">PDF → Cloze Flashcards</h3>
      <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-8 transition-colors hover:border-[#3399ff]/40 hover:bg-blue-50/30">
        <span className="mb-2 text-3xl">📄</span>
        <span className="text-sm font-medium text-slate-600">
          {busy ? "Parsing PDF…" : "Click to upload a PDF"}
        </span>
        <input
          type="file"
          accept="application/pdf"
          disabled={busy}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
      </label>
      {status && (
        <p className="animate-fade-in mt-3 text-sm text-slate-500">{status}</p>
      )}
    </Card>
  );
}
