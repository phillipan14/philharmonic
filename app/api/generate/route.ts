import { NextRequest, NextResponse } from "next/server";
import { generateMusic } from "@/lib/huggingface";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, duration } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 500) {
      return NextResponse.json({ error: "Prompt must be under 500 characters" }, { status: 400 });
    }

    const durationSec = Math.min(Math.max(Number(duration) || 10, 5), 30);

    const audioBuffer = await generateMusic({
      prompt: prompt.trim(),
      duration: durationSec,
    });

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/flac",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate music";
    const status = message.includes("loading") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
