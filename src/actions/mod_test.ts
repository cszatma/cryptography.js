import { assertEquals, test } from "https://deno.land/std/testing/mod.ts";
import { decrypt, encrypt } from "./mod.ts";

test(function encryptInput(): void {
  const input = "THIS IS A TEST TO SEE IF THIS GETS ENCRYPTED";
  const result = encrypt("abcdefgh", input, true);
  assertEquals(
    result,
    "DYLPN   UYTODP  ODDYTY  DTPTQ   TDUKH   UYDDR   YMSDY   TPPUPI  "
  );
});

test(function decryptInput(): void {
  const input = "DYLPN   UYTODP  ODDYTY  DTPTQ   TDUKH   UYDDR   YMSDY   TPPUPI  ";
  const result = decrypt("abcdefgh", input, true);
  assertEquals(
    result,
    "THIS IS A TEST TO SEE IF THIS GETS ENCRYPTED"
  );
});
