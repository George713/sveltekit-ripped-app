import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import OpenAI from "openai";

import type { LanguageCode } from '$lib/lang';
import { PUBLIC_DEEPSEEK_API_KEY, PUBLIC_OPENROUTER_API_KEY } from '$env/static/public';

const SYSTEM_PROMPT = `
You are a nutrition bot. You will receive two inputs:
1. The language code of the language the user is speaking (e.g. 'en-GB', 'de-DE', 'it-IT', 'es-ES', 'fr-FR')
2. A transcript of what the user said he or she ate.

The latter will be in the language the user is speaking. It will be one or more items.

Your task is to determine the calories (kcal) and protein (g) of each item.

Take special care when evaluating whether details of an item are given additionally or whether it is a new item.
When in doubt, assume additional details were given and not new items. E.g. when given \`one protein shake with
500ml milk, 1.5% fat and 40g soy protein powder\`, this means that the entire protein shake consists of 500ml 1.5% milk
and 40g soy protein powder.

When given the amount of an item, use it to calculate the kcal and protein amounts, e.g. \`3 eggs\` should
result in kcal and protein amounts based on the sum of three individual eggs. The same is true for liquids,
e.g. \`500ml milk\` should yield the same amount of calories and protein as 5 times \`100ml milk\`.

Your task is to return a json object with the following key and its subkeys:
- items: a list of the various items you identified from the transcript
  - name: short name or description of each item, max. 16 characters
  - kcal: kcal of item, integer value
  - protein: grams of protein, at maximum 1 decimal digit
  - icon: an icon or emoji representing the item

For \`name\`:
- abbreviate units
- use numbers instead of words
- skip '1' if it is a single item
- if given kcal or protein amount, don't repeat them in the name
- use the language the user is speaking

Return just the json, nothing else.
`

const openai = new OpenAI({
    // baseURL: 'https://api.deepseek.com',
    // apiKey: PUBLIC_DEEPSEEK_API_KEY
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: PUBLIC_OPENROUTER_API_KEY
});

const invokeLLM = async (transcript: string, voiceLanguage: LanguageCode) => {
    const message = `Language code: ${voiceLanguage}\nTranscript: ${transcript}`

    const completion = await openai.chat.completions.create({
        // model: "deepseek-chat",
        // model: "mistralai/mistral-small-3.1-24b-instruct:free",
        model: "google/gemma-3-27b-it:free",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
        ],
    });

    return completion.choices[0].message.content
}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData()
    const transcript = formData.get('transcript') as string;
    const voiceLanguage = formData.get('voiceLanguage') as LanguageCode;

    const llmResponse = await invokeLLM(transcript, voiceLanguage)
    return json({ "recordingResult": llmResponse })
};