namespace WordBreakII140 {

    function wordBreak(s: string, wordDict: string[]): string[] {
        const
            paths: string[] = [],
            dict: Set<string> = new Set(wordDict),
            fn = (start: number, path: string[] = []) => {
                let prefix = '';

                for (let i = start; i < s.length; i += 1) {
                    prefix += s[i];

                    if (dict.has(prefix)) {
                        fn(i + 1, path.concat(prefix));

                        if (i === s.length -1 && prefix.length === i - start + 1) {
                            path.push(prefix);
                            paths.push(path.join(' '));
                        }
                    }
                }
            };

        fn(0);
        return paths;
    };

}
