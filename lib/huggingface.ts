const FAL_API_URL = "https://fal.run/fal-ai/minimax-music/v2";

export interface GenerateOptions {
  prompt: string;
  duration?: number; // seconds (5-30)
}

interface FalAudioResponse {
  audio: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
}

export async function generateMusic(options: GenerateOptions): Promise<string> {
  const { prompt } = options;

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    throw new Error(
      "fal.ai API key required. Get one at fal.ai/dashboard/keys and add FAL_KEY to .env.local"
    );
  }

  const response = await fetch(FAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${falKey}`,
    },
    body: JSON.stringify({
      prompt: prompt.slice(0, 300),
      lyrics_prompt: "[instrumental]",
      audio_setting: {
        sample_rate: 44100,
        bitrate: 256000,
        format: "mp3",
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid fal.ai API key. Check your FAL_KEY in .env.local");
    }
    if (response.status === 429) {
      throw new Error("Rate limited. Please try again in a moment.");
    }

    throw new Error(`Generation failed (${response.status}): ${errorBody.slice(0, 200)}`);
  }

  const data: FalAudioResponse = await response.json();

  if (!data.audio?.url) {
    throw new Error("No audio URL in response");
  }

  return data.audio.url;
}
