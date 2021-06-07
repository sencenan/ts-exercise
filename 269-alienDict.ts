namespace AlienDict269 {

    function alienOrder(words: string[]): string {
        const adjTable: { [_: string]: Set<string> } = {};

        for (let lo = 0; lo < words.length; lo += 1) {
            Array.from(words[lo]).forEach(c => {
                if (adjTable[c] === undefined) {
                    adjTable[c] = new Set();
                }
            });

            if (lo + 1 >= words.length) {
                break;
            }

            // find first letter that differs
            const
                l = words[lo],
                h = words[lo + 1];

            let i = 0;
            for (
                ;
                i < Math.min(l.length, h.length) && l[i] === h[i];
                i += 1
            ) {}

            if (i < Math.min(l.length, h.length)) {
                if (adjTable[h[i]] === undefined) {
                    adjTable[h[i]] = new Set();
                }
                adjTable[l[i]].add(h[i]);
            } else if (l.length > h.length) {
                return '';
            }
        }

        let
            hasCycle = false,
            res: string = '';

        const
            letters = Object.keys(adjTable),
            visited: Set<string> = new Set(),
            visit = (n: string, path: Set<string> = new Set()): void => {
                if (!visited.has(n)) {
                    if (path.has(n)) {
                        hasCycle = true;
                        return;
                    }

                    path.add(n);
                    for (const k of adjTable[n]) {
                        visit(k, path);
                    }
                    path.delete(n);

                    visited.add(n);
                    res = n + res;
                }
            };

        letters.map(l => visit(l));
        return hasCycle ? '' : res;
    };

}
