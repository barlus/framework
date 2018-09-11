export class RuntimeError extends Error {
  static NOT_IMPLEMENTED = new RuntimeError('unimplemented method');
  constructor(message) {
    super(message);
  }
}