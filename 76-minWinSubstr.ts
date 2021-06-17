namespace MinWinSubstr76 {

    function minWindow(s: string, t: string): string {
        const
            dict: Record<string, number> = {},
            win: Record<string, number> = {};

        Array.from(t).forEach(c => {
            if (dict[c] === undefined) {
                dict[c] = 0;
            }

            dict[c] += 1;
        });

        let
            bestStart = -1,
            bestEnd = -1,
            end = 0,
            start = -1;

        for (; end < s.length; end += 1) {
            if (dict[s[end]] !== undefined) {
                if (win[s[end]] === undefined) {
                    win[s[end]] = 0;
                }

                win[s[end]] += 1;

                // all characters in window, move start pointer
                if (Object.keys(dict).reduce((flag, key) => flag && dict[key] <= win[key], true)) {

                    while (start < end) {
                        start += 1;

                        if (bestStart < 0 || end - start < bestEnd - bestStart) {
                            bestStart = start;
                            bestEnd = end;
                        }

                        if (dict[s[start]] !== undefined) {
                            win[s[start]] -= 1;

                            if (win[s[start]] < dict[s[start]]) {
                                break;
                            }
                        }
                    }

                }
            }
        }

        return bestStart === -1 ? '' : s.substring(bestStart, bestEnd + 1);
    };

}
