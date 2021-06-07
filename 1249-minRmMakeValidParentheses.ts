namespace MinRemoveMakeValidParentheses1249 {

    function minRemoveToMakeValid(s: string): string {
        let
            openCnt = 0,
            res = '',
            res2 = '';

        for (let i = 0; i < s.length; i += 1) {
            switch (s[i]) {
                case '(':
                    openCnt += 1;
                    break;
                case ')':
                    if (openCnt <= 0) {
                        continue;
                    }
                    openCnt -= 1;
            }

            res += s[i];
        }

        openCnt = 0;
        for (let i = res.length - 1; i >= 0; i -= 1) {
            switch (res[i]) {
                case ')':
                    openCnt += 1;
                    break;
                case '(':
                    if (openCnt <= 0) {
                        continue;
                    }
                    openCnt -= 1;
            }

            res2 = res[i] + res2;
        }

        return res2;
    };

}
