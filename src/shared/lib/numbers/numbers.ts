/**
 * Limits an index within the limit from `0` to `limit`.
 *
 * If `i > limit`, `i` will start from `0` again.
 *
 * If `i < 0`, `i` will start in the opposite direction from the `limit`.
 *
 * @param i Initial index.
 * @param limit Must be greater than or equal to 0.
 * @returns The index within the limit.
 *
 * @example
 * ```
 * getIndexWithinLimit(0, 4); // 0
 * getIndexWithinLimit(5, 4); // 0
 * getIndexWithinLimit(7, 4); // 2
 * getIndexWithinLimit(-1, 4); // 4
 *
 * ```
 */
export const getIndexWithinLimit = (i: number, limit: number) => {
  if (limit < 0) {
    throw new Error('Limit must be greater than or equal to 0.');
  }

  if (limit === 0) {
    return 0;
  }

  const sum = i % (limit + 1);

  if (sum < 0) {
    return limit + sum + 1;
  }

  if (sum > limit) {
    return sum - limit - 1;
  }

  return sum;
};

export const getRandomNumber = (a: number, b: number) => {
  if (a < 0 || b < 0) {
    throw new Error('Values must be greater than or equal to 0.');
  }

  const max = Math.max(a, b);
  const min = Math.min(a, b);

  return (max - min) * Math.random() + min;
};
