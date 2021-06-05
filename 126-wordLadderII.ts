namespace WordLadderII126 {

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const
        len = beginWord.length,
        adjTable: Record<string, Set<string>> = {},
        paths: string[][] = [],
        res: string[][] = [],
        visited = new Set<string>();

    if (wordList.indexOf(endWord) < 0) {
        return [];
    }

    wordList.unshift(beginWord);

    for (let i = 0; i < wordList.length; i += 1) {
        for (let j = i + 1; j < wordList.length; j += 1) {
            const
                a = wordList[i],
                b = wordList[j];

            let diff = 0;

            for (let k = 0; k < len && diff < 2; k += 1) {
                if (a[k] !== b[k]) {
                    diff += 1;
                }
            }

            if (diff === 1) {
                if (adjTable[a] === undefined) {
                    adjTable[a] = new Set<string>();
                }

                if (adjTable[b] === undefined) {
                    adjTable[b] = new Set<string>();
                }

                adjTable[a].add(b);
                adjTable[b].add(a);
            }
        }
    }

    paths.push([beginWord]);

    while (paths.length > 0) {
        const
            p = paths.shift() as string[],
            tail = p[p.length - 1],
            ns: Set<string> = adjTable[tail];

        if (ns !== undefined) {
            for (const n of ns) {
                if (n === endWord) {
                    const r = p.concat(n);

                    if (res.length > 0 && r.length > res[0].length) {
                        // no more shorter paths
                        return res;
                    } else {
                        res.push(r);
                    }
                }

                if (!visited.has(n)) {
                    paths.push(p.concat(n));
                }
            }
        }

        visited.add(tail);
    }

    return res;
};

}
