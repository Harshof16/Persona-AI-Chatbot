// src/lib/getPersona.server.ts
import path from "path";
import fs from "fs";
import { Persona, PersonaId, personas } from "./personas";

export function getPersona(id: string | undefined | null): Persona | undefined {
  if (!id) return undefined;

  try {
    // const filePath = path.join(__dirname, "personas", `${id}.txt`);
    // const filePath = path.join(__dirname, 'hitesh.txt');
    const filePath = path.resolve(process.cwd(), `src/lib/personas/${id}.txt`)
console.log('Resolved Path:', filePath);

// Check if file exists
console.log('Exists?', fs.existsSync(filePath));
    console.log('filePath:', filePath);
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

