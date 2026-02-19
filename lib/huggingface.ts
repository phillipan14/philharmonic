const HF_MODEL = "facebook/musicgen-small";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

export interface GenerateOptions {
  prompt: string;
  duration?: number; // seconds (5-30)
}

export async function generateMusic(options: GenerateOptions): Promise<ArrayBuffer> {
  const { prompt, duration = 10 } = options;

  // MusicGen accepts the prompt as the input text
  // Duration is controlled by max_new_tokens (~50 tokens per second of audio)
  const tokensPerSecond = 50;
  const maxNewTokens = duration * tokensPerSecond;

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.HF_TOKEN ? { Authorization: `Bearer ${process.env.HF_TOKEN}` } : {}),
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: maxNewTokens,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    // Model loading — HF returns 503 while warming up
    if (response.status === 503) {
      throw new Error("Model is loading. Please try again in 30-60 seconds.");
    }

    throw new Error(`HF API error (${response.status}): ${errorBody}`);
  }

  return response.arrayBuffer();
}
