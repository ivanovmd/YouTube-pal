export class BaseSingleton {
  private static instance: BaseSingleton;

  constructor() { }

  public static getInstance<T extends typeof BaseSingleton>(this: T, ...args: any[]): InstanceType<T> | BaseSingleton {
    if (!this.instance) {
      this.instance = new this(...args);
    }
    return this.instance;
  }
}