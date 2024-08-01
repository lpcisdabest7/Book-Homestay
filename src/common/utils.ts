import fs from 'node:fs/promises';
import path from 'node:path';

import axios from 'axios';

export function getVariableName<TResult>(
  getVar: () => TResult,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts.at(-1);
}

export function getTopicInNumberedListOfStringRaw(strRaw: string) {
  const regex = /\d+\.\s*"([^"]+)"/g;

  const mainTopics: string[] = [];

  let match;

  while ((match = regex.exec(strRaw)) !== null) {
    const topic = match[1] as string;
    mainTopics.push(topic);
  }

  return mainTopics;
}

export async function createIfNotExistDir(location: string) {
  try {
    await fs.access(location);
  } catch {
    await fs.mkdir(location, { recursive: true });
  } finally {
    return location;
  }
}

export async function writeBufferToFile(buffer: Buffer, location: string) {
  await fs.writeFile(location, buffer);

  return location;
}

export async function downloadFileFromUrl(url: string, location: string) {
  const dirPath = path.dirname(location);
  await createIfNotExistDir(dirPath);

  if (url.startsWith('http')) {
    const axiosResponse = await axios.get<Buffer>(url, {
      responseType: 'arraybuffer',
    });

    await writeBufferToFile(axiosResponse.data, location);
  }

  return location;
}

export async function transformBase64ToFile(
  base64Data: string,
  fileLocation: string,
): Promise<string> {
  const buffer = Buffer.from(base64Data, 'base64');
  await fs.writeFile(fileLocation, buffer);

  return fileLocation;
}

export const makeUrl = (...str: string[]) =>
  str
    .filter(Boolean)
    .map((s: string) => s.replaceAll(/^\/+|\/+$/gm, ''))
    .join('/');
