export class Random {
  static getFloat(min, max): number {
    return Math.random() * (max - min) + min;
  }
  static getInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
