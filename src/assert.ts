export class AssertionError extends Error {
  constructor(message?: string) {
    super(`AssertionError: ${message}`);
  }
}

export default function assert(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new AssertionError(message);
  }
}
