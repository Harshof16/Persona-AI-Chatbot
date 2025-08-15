// src/lib/getPersona.server.ts
import path from "path";
import fs from "fs";
import { Persona, PersonaId, personas } from "./personas";

export function getPersona(id: string | undefined | null): Persona | undefined {
  if (!id) return undefined;

  try {
    const filePath = path.resolve(process.cwd(), `src/lib/personas/${id}.txt`);

    // Check if file exists
    const systemPrompt = fs.readFileSync(filePath, "utf-8");

    return {
      ...personas[id as PersonaId],
      systemPrompt,
    };
  } catch (err) {
    console.error(`Persona file for "${id}" not found:`, err);
    return undefined;
  }
}
