// Minimal demo to call Anthropic Claude from Node.js
(async () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Please set the ANTHROPIC_API_KEY environment variable.');
    process.exit(1);
  }

  const { Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const resp = await client.completions.create({
      model: 'claude-2.1',
      prompt: 'Write a friendly one-line joke about programming.',
      max_tokens_to_sample: 200,
    });

    // Newer SDKs return `completion` field; print whole object if not present
    console.log(resp.completion ?? JSON.stringify(resp, null, 2));
  } catch (err) {
    console.error('Error calling Claude:', err.message ?? err);
    process.exit(1);
  }
})();
