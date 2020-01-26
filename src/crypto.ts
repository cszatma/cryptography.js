import * as fs from "https://deno.land/std/fs/mod.ts";
import { resolve, dirname } from "https://deno.land/std/path/mod.ts";
import { processInput } from "./mod.ts";

const args = Deno.args;
if (args.length !== 4) {
  console.log("Usage: crypto <command> <key> <input file> <output file>");
  Deno.exit(1);
}

const [rawCommand, key, inputFile, outputFile] = args;
const command = rawCommand.trim().toLowerCase();

const inputPath = resolve(inputFile);

// Make sure the input file exists
if (!fs.existsSync(inputFile)) {
  console.log(`Error: Input file '${inputPath}' does not exist.`);
  Deno.exit(1);
}

console.log("Generating output...");
// Get the output
const outputData = processInput(
  command,
  key,
  fs.readFileStrSync(inputPath, { encoding: "utf-8" })
);

console.log("Writing to file...");
// Write the output file
const outputPath = resolve(outputFile);
fs.ensureDirSync(dirname(outputPath));
fs.writeFileStrSync(outputPath, outputData);

console.log(`Successfully wrote result to ${outputPath}.`);
Deno.exit(0);
