import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { personalFields } = req.body;

  const fieldMap = Object.fromEntries(
    personalFields.map((f: { label: string; value: string }) => [f.label, f.value])
  );

  const prompt = `Write a short and culturally appropriate "About Me" for a marriage biodata using:
Name: ${fieldMap['Name']}
Gender: ${fieldMap['Gender']}
Date of Birth: ${fieldMap['Date of Birth']}
Place of Birth: ${fieldMap['Place of Birth']}
Complexion: ${fieldMap['Complexion']}
Height: ${fieldMap['Height']}
Occupation: ${fieldMap['Occupation']}
Education: ${fieldMap['Education']}
Income: ${fieldMap['Income']}
Keep it under 100 words, warm, and respectful. Avoid sharing specific income/contact info.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    });

    const aboutMe = completion.choices[0].message.content.trim();
    res.status(200).json({ aboutMe });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Error generating About Me' });
  }
}


export const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({ message: 'Method Not Allowed' });
}