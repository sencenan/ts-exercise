namespace Combinatorics {

// iterate nCk
const choose = (n: number, k: number): number[][] => {
    const
        paths: number[][] = [],
        res: number[][] = [];

    for (let i = 0; i < n; i += 1) {
        paths.push([i]);

        for (let j = 0, pLen = paths.length - 1; j < pLen; j += 1) {
            if (paths[j].length < k) {
                if (paths[j].length === k - 1) {
                    res.push(paths[j].concat(i));
                } else {
                    paths.push(paths[j].concat(i));
                }
            }
        }
    }

    return res;
};

}
