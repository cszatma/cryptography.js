import seedrandom, { PRNG } from "./seedrandom.ts";

export default class Random {
  private generator: PRNG;

  constructor(seed?: any) {
    this.generator = seedrandom(seed.toString());
  }

  public int32(max: number = 1): number {
    return Math.floor(this.generator.double() * max);
  }
}
