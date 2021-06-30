namespace WordBreak139 {

    function wordBreak(s: string, wordDict: string[]): boolean {
        const
            memo: Record<string, boolean> = {},
            solver = (s: string): boolean => {
                if (memo[s] !== undefined) {
                    return memo[s];
                }

                if (s.length === 0) {
                    return memo[s] = true;
                }

                for (const w of wordDict) {
                    if (s.indexOf(w) === 0) {
                        // w is a prefix of s
                        if (solver(s.substring(w.length))) {
                            return memo[s] = true;
                        }
                    }
                }

                return memo[s] = false;
            };

        return solver(s);
    };

}
