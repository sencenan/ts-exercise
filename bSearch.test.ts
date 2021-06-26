namespace BinarySearch {

    // lo, hi are inclusive
    const
        bSearchAny = (nums: number[], target: number): number => {
            let
                lo = 0,
                hi = nums.length - 1;

            while (lo <= hi) {
                const
                    mid = Math.floor((lo + hi) / 2),
                    midVal = nums[mid];

                if (target < midVal) {
                    hi = mid - 1;
                } else if (midVal < target) {
                    lo = mid + 1;
                } else {
                    return mid;
                }
            }

            return -(lo + 1);
        },
        bSearchFirst = (nums: number[], target: number): number => {
            let
                lo = 0,
                hi = nums.length;

            while (lo < hi) {
                const
                    mid = Math.floor((lo + hi) / 2),
                    midVal = nums[mid];

                if (target <= midVal) {
                    hi = mid;
                } else if (midVal < target) {
                    lo = mid + 1;
                }
            }

            if (nums[lo] === target) {
                return lo;
            } else {
                return -(lo + 1);
            }
        },
        bSearchLast = (nums: number[], target: number): number => {
            let
                lo = 0,
                hi = nums.length;

            while (lo < hi) {
                const
                    mid = Math.floor((lo + hi) / 2),
                    midVal = nums[mid];

                if (target < midVal) {
                    hi = mid;
                } else if (midVal <= target) {
                    lo = mid + 1;
                }
            }

            if (nums[hi - 1] === target) {
                return hi - 1;
            } else {
                return -(hi + 1);
            }
        };

    describe('bSearchAny', () => {
        it('returns -1 for empty', () => {
            const r = bSearchAny([], 1);
            expect(r).toBe(-1);
        });

        it('handles single array', () => {
            expect(bSearchAny([1], 1)).toBe(0);
            expect(bSearchAny([1], 0)).toBe(-1);
            expect(bSearchAny([1], 2)).toBe(-2);
        });

        it('handles arrays with unique values', () => {
            expect(bSearchAny([1, 2, 3, 4], 2)).toBe(1);
            expect(bSearchAny([1, 2, 3, 4, 5], 3)).toBe(2);
            expect(bSearchAny([3, 4, 5], 6)).toBe(-4);
            expect(bSearchAny([3, 4, 5], 2)).toBe(-1);
            expect(bSearchAny([3, 4, 6], 5)).toBe(-3);
            expect(bSearchAny([3, 5, 6], 4)).toBe(-2);
        });

        it('handles arrays with duplicated values', () => {
            expect(bSearchAny([2, 2, 2, 2, 2], 2)).toBe(2);
            expect(bSearchAny([1, 1, 2, 2, 2, 2, 2], 2)).toBe(3);
            expect(bSearchAny([2, 2, 2, 2, 2], 1)).toBe(-1);
            expect(bSearchAny([2, 2, 2], 3)).toBe(-4);
            expect(bSearchAny([2, 2, 2, 4, 4, 4], 3)).toBe(-4);
        });
    });

    describe('bSearchFirst', () => {
        it('returns -1 for empty', () => {
            const r = bSearchFirst([], 1);
            expect(r).toBe(-1);
        });

        it('handles single array', () => {
            expect(bSearchFirst([1], 1)).toBe(0);
            expect(bSearchFirst([1], 0)).toBe(-1);
            expect(bSearchFirst([1], 2)).toBe(-2);
        });

        it('handles arrays with unique values', () => {
            expect(bSearchFirst([1, 2, 3, 4], 2)).toBe(1);
            expect(bSearchFirst([1, 2, 3, 4, 5], 3)).toBe(2);
            expect(bSearchFirst([3, 4, 5], 6)).toBe(-4);
            expect(bSearchFirst([3, 4, 5], 2)).toBe(-1);
            expect(bSearchFirst([3, 4, 6], 5)).toBe(-3);
            expect(bSearchFirst([3, 5, 6], 4)).toBe(-2);
        });

        it('handles arrays with duplicated values', () => {
            expect(bSearchFirst([2, 2, 2, 2, 2], 2)).toBe(0);
            expect(bSearchFirst([1, 1, 2, 2, 2, 2, 2], 2)).toBe(2);
            expect(bSearchFirst([2, 2, 2, 2, 2], 1)).toBe(-1);
            expect(bSearchFirst([2, 2, 2], 3)).toBe(-4);
            expect(bSearchFirst([2, 2, 2, 4, 4, 4], 3)).toBe(-4);
            expect(bSearchFirst([2, 2, 2, 4, 4, 4], 4)).toBe(3);
        });
    });

    describe('bSearchLast', () => {
        it('returns -1 for empty', () => {
            const r = bSearchLast([], 1);
            expect(r).toBe(-1);
        });

        it('handles single array', () => {
            expect(bSearchLast([1], 1)).toBe(0);
            expect(bSearchLast([1], 0)).toBe(-1);
            expect(bSearchLast([1], 2)).toBe(-2);
        });

        it('handles arrays with unique values', () => {
            expect(bSearchLast([1, 2, 3, 4], 2)).toBe(1);
            expect(bSearchLast([1, 2, 3, 4, 5], 3)).toBe(2);
            expect(bSearchLast([3, 4, 5], 6)).toBe(-4);
            expect(bSearchLast([3, 4, 5], 2)).toBe(-1);
            expect(bSearchLast([3, 4, 6], 5)).toBe(-3);
            expect(bSearchLast([3, 5, 6], 4)).toBe(-2);
        });

        it('handles arrays with duplicated values', () => {
            expect(bSearchLast([2, 2, 2, 2, 2], 2)).toBe(4);
            expect(bSearchLast([1, 1, 2, 2, 2, 2, 2], 2)).toBe(6);
            expect(bSearchLast([2, 2, 2, 2, 2], 1)).toBe(-1);
            expect(bSearchLast([2, 2, 2], 3)).toBe(-4);
            expect(bSearchLast([2, 2, 2, 4, 4, 4], 3)).toBe(-4);
            expect(bSearchLast([2, 2, 2, 4, 4, 4], 2)).toBe(2);
            expect(bSearchLast([2, 2, 2, 4, 4, 4], 4)).toBe(5);
            expect(bSearchLast([2, 2, 2, 4, 4, 4], 5)).toBe(-7);
        });
    });

}
