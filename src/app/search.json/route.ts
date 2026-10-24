import { all } from "@/lib/data";

export const dynamic = "force-static";

// Compact index for in-browser search: short keys, summaries only, no bodies.
export function GET() {
  return Response.json(
    all().map((a) => ({ id: a.id, t: a.title, s: a.summary, a: a.author, l: a.lang, src: a.sourceName, d: a.date, tp: a.topic, c: a.countries ?? [] })),
  );
}
