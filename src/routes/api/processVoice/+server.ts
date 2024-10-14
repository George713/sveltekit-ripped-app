import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import OpenAI from "openai";

import { PUBLIC_DEEPSEEK_API_KEY } from '$env/static/public';

const SYSTEM_PROMPT = `
I will give you a list of items I have eaten. I want you to tell me the calories and protein amounts of each item.
In addition, also give me the totals.

Take particular care when evaluating whether details of an item are given additionally or whether it is a new item.
When in doubt, assume additional details were given and not new items. E.g. when given \`one protein shake with
500ml milk, 1.5% fat and 40g soy protein powder\`, this means that the entire protein shake consists of 500ml 1.5% milk
and 40g soy protein powder.

For the calories use \`kcal\` as unit and for the protein use grams, abbreviated as \`g\`.

In addition, provide me with an icon for each item.

Your response should be in the format of json with the following keys:
- items: a list of the various items
  - name: short name or description of each item, max. 16 characters
  - kcal
  - protein
  - icon
- sumKcal
- sumProtein
- combinedName: a brief description summarizing the items

For \`name\` and \`combinedName\`:
- abbreviate units
- use numbers instead of words
- skip '1' if it is a single item
- if given kcal or protein amount, don't repeat them in the name

Return just the json, nothing else.
`

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: PUBLIC_DEEPSEEK_API_KEY
});

const invokeLLM = async (transcript: string) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: transcript }
        ],
        model: "deepseek-chat",
    });

    return completion.choices[0].message.content
}

export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData()
    const transcript = formData.get('transcript') as string;

    const llmResponse = await invokeLLM(transcript)
    return json({ "recordingResult": llmResponse })
};
