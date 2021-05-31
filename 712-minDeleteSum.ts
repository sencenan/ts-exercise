namespace MinDeleteSum {

function minimumDeleteSum(s1: string, s2: string): number {
    const
        memo: Record<string, number> = {},
        editDist = (
            alo: number, ahi: number,
            blo: number, bhi: number,
            k = JSON.stringify([alo, ahi, blo, bhi])
        ): number => {
            if (memo[k] !== undefined) {
                return memo[k];
            }

            if (s1.substring(alo, ahi + 1) === s2.substring(blo, bhi + 1)) {
                return memo[k] = 0;
            }

            while (alo <= ahi && blo <= bhi && s1[alo] === s2[blo]) {
                alo += 1;
                blo += 1;
            }

            memo[k] = 0;
            if (alo > ahi) {
                while (blo <= bhi) { memo[k] += s2.charCodeAt(blo); blo += 1; }
            } else if (blo > bhi) {
                while (alo <= ahi) { memo[k] += s1.charCodeAt(alo); alo += 1; }
            } else {
                const [ac, bc] = [s1.charCodeAt(alo), s2.charCodeAt(blo)];

                memo[k] = Math.min(
                    ac + editDist(alo + 1, ahi, blo, bhi),
                    bc + editDist(alo, ahi, blo + 1, bhi),
                    ac + bc + editDist(alo + 1, ahi, blo + 1, bhi)
                );
            }

            return memo[k];
        }

    return editDist(0, s1.length - 1, 0, s2.length - 1);
};

let a: string;
let b: string;

a = "sea"
b = "eat"
console.log(minimumDeleteSum(a, b));

a = "delete"
b = "leet"
console.log(minimumDeleteSum(a, b));

a="sjfqkfxqoditw"
b="fxymelgo"
console.log(minimumDeleteSum(a, b));

a="acacabcaabac"
b="accabaccccabaca"
console.log(minimumDeleteSum(a, b));

a="xnbteodleejrzeo"
b="gaouojqkkk"
console.log(minimumDeleteSum(a, b));

}
