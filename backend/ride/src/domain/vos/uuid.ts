export class UUID {
  constructor(private value: string) {
    this.value = value;
  }

  public getValue() {
    return this.value;
  }

  static create() {
    const uuid = crypto.randomUUID();
    return new UUID(uuid);
  }
}
