namespace CountCountRepeats466 {

    function getMaxRepetitions(s1: string, n1: number, s2: string, n2: number): number {

        // test for impossible cases, s1 must contain all chars in s2
        for (let i = 0; i < s2.length; i += 1) {
            if (s1.indexOf(s2[i]) < 0) {
                return 0;
            }
        }

        // find how many s2 can fit in s1 * n1
        let
            n1i = 0,
            n2i = 0,
            str2Len = s2.length * n2,
            s1Cnt = 0,
            str2Cnt = 0;

        if (n1 * s1.length < str2Len) {
            return 0;
        }

        while (n1i < n1 * s1.length) {
            if (s2[n2i % s2.length] === s1[n1i % s1.length]) {
                n2i += 1;
            }

            n1i += 1;
        }

        return Math.floor(n2i / str2Len);
    };

}
