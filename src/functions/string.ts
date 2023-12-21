function isString(value: unknown): boolean {
  return value !== null && typeof value === 'string';
}

export default { isString };
