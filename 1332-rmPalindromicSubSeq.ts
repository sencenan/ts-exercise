namespace RemovePalindromicSubSeq1332 {

    function removePalindromeSub(s: string): number {
        if (s.length === 0) {
            return 0;
        }

        for (let i = 0, j = s.length - 1; i <= j; i += 1, j -= 1) {
            if (s[i] !== s[j]) {
                const
                    aStart = s.indexOf('a'),
                    bStart = s.indexOf('b');

                if (aStart < 0 || bStart < 0) {
                    return 1;
                } else {
                    return 2;
                }
            }
        }

        return 1;
    };

}
