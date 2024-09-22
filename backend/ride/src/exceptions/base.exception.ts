export class BaseException extends Error {
  constructor(message: string, private code: number) {
    super(message);
  }
  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
