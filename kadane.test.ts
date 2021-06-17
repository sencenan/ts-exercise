namespace Kadane {

// variant that does not return empty
const kadane = (ns: number[]): [number, number, number] => {
    let
        gMax = -Infinity,
        curMax = -Infinity,
        start = 0,
        end = 0;

    ns.forEach((v, i) => {
        if (curMax + v < v) {
            curMax = v;

            if (curMax > gMax) { // start of new seq
                start = i;
            }
        } else {
            curMax = curMax + v; // extending the seq
        }

        if (curMax > gMax) {
            gMax = curMax;
            end = i + 1;
        }
    });

    return [gMax, start, end];
};

it('handles empty', () => {
    expect(kadane([])).toEqual([-Infinity, 0, 0]);
});

it('handles single', () => {
    expect(kadane([0])).toEqual([0, 0, 1]);
    expect(kadane([1])).toEqual([1, 0, 1]);
    expect(kadane([10])).toEqual([10, 0, 1]);
    expect(kadane([-1])).toEqual([-1, 0, 1]);
    expect(kadane([-10])).toEqual([-10, 0, 1]);
});

it('handles all positive', () => {
    expect(kadane([1,2,3,4])).toEqual([10, 0, 4]);
});

it('handles all negative', () => {
    expect(kadane([-1,-2,-3,-4])).toEqual([-1, 0, 1]);
    expect(kadane([-2,-1,-3,-4])).toEqual([-1, 1, 2]);
    expect(kadane([-2,-3,-1,-4])).toEqual([-1, 2, 3]);
    expect(kadane([-2,-3,-4,-1])).toEqual([-1, 3, 4]);
});

it('handles mixed', () => {
    const
        ns = [-2, -3, 4, -1, -2, 1, 5, -3],
        res = kadane(ns);

    expect(res).toEqual([7, 2, 7]);
    expect(ns.slice(res[1], res[2]).reduce((s, i) => s + i, 0)).toBe(7);
});

}
