import stripAnsi from 'strip-ansi';

export const serializeError = (error: any) => {
  const serialized = Object.getOwnPropertyNames(error).reduce<
    Record<string, any>
  >((res, key) => {
    res[key] = error[key];
    return res;
  }, {});

  for (const key in serialized) {
    if (typeof serialized[key] === 'string') {
      serialized[key] = stripAnsi(serialized[key]);
    }
  }
  return JSON.stringify(serialized, null, 2);
};
