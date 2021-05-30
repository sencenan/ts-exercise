namespace FindAnagrams438 {

    const memo: Record<string, number> = {};
    const hashCode = (s: string): number => {
        if (memo[s] !== undefined) {
            return memo[s];
        }

        let
            h: number = 0,
            cs = s.split('').sort();

        for (let i = 0; i < cs.length; i++) {
            h = Math.imul(31, h) + cs[i].charCodeAt(0) | 0;
        }

        return memo[s] = h;
    }

    function findAnagrams(s: string, p: string): number[] {
        const
            pSet = new Set<string>(p.split('')),
            pHash = hashCode(p),
            res: number[] = [];

        let window: string = '';

        for (let i = 0; i < s.length; i += 1) {
            if (pSet.has(s[i])) {
                window += s[i];

                if (window.length === p.length) {
                    if (hashCode(window) === pHash) {
                        res.push(i - p.length + 1);
                    }

                    window = window.substring(1);
                }
            } else {
                window = '';
            }
        }

        return res;
    };

    let a: string, b: string;

    a = "cbaebabacd";
    b = "abc"
    console.log(a.length, findAnagrams(a, b));

}
