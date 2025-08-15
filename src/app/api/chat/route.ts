import { ChatMessage } from "@/types/chat";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getPersona } from "@/lib/getPersona.server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
});

export async function POST(req: Request) {
  try {
    const { personaId, messages }: { personaId: string; messages: ChatMessage[] } = await req.json()
    const persona = getPersona(personaId)
    if (!persona) return NextResponse.json({ error: 'Persona not found' }, { status: 400 })

    const completion = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "system", content: persona.systemPrompt }, ...messages],
    });

    return NextResponse.json({
      response: completion.choices[0].message.content ?? '',
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}

