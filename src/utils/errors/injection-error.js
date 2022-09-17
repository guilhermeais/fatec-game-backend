export class InjectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InjectionError';
  }
}