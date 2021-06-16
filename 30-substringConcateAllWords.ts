namespace substringConcateAllWords30 {

    function findSubstring(s: string, words: string[]): number[] {
        const
            dict: Record<string, number> = words.reduce(
                (d, w) => {
                    if (d[w] === undefined) {
                        d[w] = 0;
                    }

                    d[w] += 1;
                    return d;
                },
                {} as Record<string, number>
            ),
            wordSize = words[0].length,
            windowSize = words[0].length * words.length,
            ans: number[] = [];

        OUTER:
        for (let i = 0; i < s.length - windowSize + 1; i += 1) {
            const visited: Record<string, number> = {};

            // slice
            for (let j = 0; j < words.length; j += 1) {
                const chunk = s.substring(i + j * wordSize, i + (j + 1) * wordSize);

                if (dict[chunk] === undefined || visited[chunk] > dict[chunk]) {
                    continue OUTER;
                }

                if (visited[chunk] === undefined) {
                    visited[chunk] = 0;
                }
                visited[chunk] += 1;
            }

            for (let j = 0; j < words.length; j += 1) {
                if (visited[words[j]] !== dict[words[j]]) {
                    continue OUTER;
                }
            }

            ans.push(i);
        }

        return ans;
    };

}
