type Emoji = {
	name: string,
	slug: string,
	group: string,
	emoji_version: string,
	unicode_version: string,
	skin_tone_support: boolean;
};

const emojis: Emoji[] = JSON.parse(await Deno.readTextFile("./data-by-emoji.json"));

let fileStr = "import Foundation\n\n";
fileStr += "let EMOJI_HASH: Dictionary<String, String> = [";

for (const [key, value] of Object.entries(emojis)) {
	fileStr += `\n	":${value.slug}:": "${key}",`;
}

fileStr += "\n]\n";

await Deno.writeTextFile("./EmojiCodes.swift", fileStr);
console.log("✅ %cExported to Swift Dictionary", "color: green");
