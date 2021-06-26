namespace NumMatchingSubSeq792 {

    function numMatchingSubseq(s: string, words: string[]): number {
        let sum = 0;

        const freq = words.reduce(
            (freq, w) => {
                if (freq[w] === undefined) {
                    freq[w] = 0;
                }

                freq[w] += 1;
                return freq;
            },
            {} as Record<string, number>
        );

        const dict = Object.keys(freq).reduce(
            (dict, w) => {
                if (dict[w[0]] === undefined) {
                    dict[w[0]] = new Set();
                }

                dict[w[0]].add(w);
                return dict;
            },
            {} as Record<string, Set<string>>
        );

        Array.from(s).forEach(
            c => {
                if (dict[c] !== undefined) {
                    const ws = dict[c] as Set<string>;
                    delete dict[c];

                    for (const w of ws) {
                        const remaining = w.substring(1);

                        if (freq[w] === undefined) {
                            continue;
                        }

                        if (remaining.length === 0) {
                            sum += freq[w];
                        } else {
                            if (freq[remaining] === undefined) {
                                freq[remaining] = 0;
                            }
                            freq[remaining] += freq[w];

                            if (dict[remaining[0]] === undefined) {
                                dict[remaining[0]] = new Set();
                            }
                            dict[remaining[0]].add(remaining);
                        }

                        delete freq[w];
                    }
                }
            }
        );

        return sum;
    };

}
