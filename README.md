# cryptography.js

TypeScript implementation of the cryptography assignment that runs on [Deno](https://deno.land/).

**DISCLAIMER:** This is for educational purposes only. This is not a secure encryption algorithm. Please do not use for anything sensitive.

## Usage

To encrypt a file:
```sh
deno run --allow-read --allow-write src/crypto.ts encrypt <KEY> <INPUT FILE> <OUTPUT FILE>
```

To decrypt a file:
```sh
deno run --allow-read --allow-write src/crypto.ts decrypt <KEY> <INPUT FILE> <OUTPUT FILE>
```

## Testing

Run all tests:
```sh
deno test --allow-env --allow-write --allow-net src
```
