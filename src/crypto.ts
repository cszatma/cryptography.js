#!/usr/bin/env node

process.on('unhandledRejection', err => {
  throw err;
});

import fs from 'fs';
import path from 'path';

import './utils/stringExtensions';
import processInput from './processInput';
import ensureDirSync from './utils/ensureDirSync';

const args = process.argv.slice(2);

if (args.length !== 4) {
  console.log('Usage: crypto <command> <key> <input file> <output file>');
  process.exit(1);
}

const [rawCommand, key, inputFile, outputFile] = args;
const command = rawCommand.trim().toLowerCase();

const inputPath = path.resolve(inputFile);

// Make sure the input file exists
if (!fs.existsSync(inputFile)) {
  console.log(`Error: Input file '${inputPath}' does not exist.`);
  process.exit(1);
}

console.log('Generating output...');
// Get the output
const outputData = processInput(
  command,
  key,
  fs.readFileSync(inputPath).toString('utf8'),
);

console.log('Writing to file...');
// Write the output file
const outputPath = path.resolve(outputFile);
ensureDirSync(outputPath);
fs.writeFileSync(outputPath, outputData, { encoding: 'utf8' });

console.log(`Successfully wrote result to ${outputPath}.`);
process.exit(0);
