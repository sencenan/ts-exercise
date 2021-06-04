namespace FindMinTimeToFinishAllJobs1723 {

const comboTable: Record<number, number[][]> = {};
function getCombos(n: number): number[][] {
    if (comboTable[n] !== undefined) {
        return comboTable[n];
    }

    let combos: number[][] = [];

    for (let i = 0; i < n; i += 1) {
        combos.push([i]);

        for (let j = 0, end = combos.length - 1; j < end; j += 1) {
            if (combos[j].length + 1 < n) {
                combos.push(combos[j].concat([i]));
            }
        }
    }

    return comboTable[n] = combos;
}

function minimumTimeRequired(jobs: number[], k: number): number {
    const memo: Record<string, number> = {};

    const helper = (ts: number[], w: number, k = JSON.stringify([ts, w])) => {
        if (memo[k] !== undefined) {
            return memo[k];
        }

        if (ts.length <= w) {
            return memo[k] = ts[ts.length - 1];
        }
        if (w === 1) {
            // only one guy
            return memo[k] = ts.reduce((s, i) => s + i, 0);
        }

        let
            assigned: number[][] = getCombos(ts.length),
            min = Infinity;

        for (let i = 0; i < assigned.length; i += 1) {
            const
                ag = assigned[i],
                remainder: number[] = [];

            let aIdx = 0;
            for (let i = 0; i < ts.length; i += 1) {
                if (aIdx >= ag.length || i !== ag[aIdx]) {
                    remainder.push(ts[i]);
                } else {
                    aIdx += 1;
                }
            }

            min = Math.min(
                min,
                Math.max(
                    ag.reduce((s, it) => s + ts[it], 0),
                    helper(remainder, w - 1)
                )
            );
        }

        return memo[k] = min;
    }

    jobs.sort((a, b) => a - b);
    return helper(jobs, k);
};

let j: number[], k: number;

j = [3,2,3] // 3
k = 3
console.log(minimumTimeRequired(j, k))

j = [1,2,4,7,8] // 11
k = 2
console.log(minimumTimeRequired(j, k))

j = [2,9,17,6] // 17
k = 2
console.log(minimumTimeRequired(j, k))

j = [5,5,4,4,4] // 12
k = 2
console.log(minimumTimeRequired(j, k))

}
