import seedrandom, { prng, seedRandomOptions } from 'seedrandom';

export default class Random {
  private generator: prng;

  constructor(seed?: any, options?: seedRandomOptions) {
    this.generator = seedrandom(seed.toString(), options);
  }

  public int32(max: number = 1): number {
    return Math.floor(this.generator.double() * max);
  }
}
