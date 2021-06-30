namespace CountAndSay38 {

    function countAndSay(n: number): string {
        const
            fn = (n: number): string => {
                if (n === 1) {
                    return '1';
                } else {
                    const prev = fn(n - 1);

                    return encode(prev);
                }
            },
            encode = (s: string): string => {
                let
                    cur = s[0],
                    count = 0,
                    res = '';

                for (let i = 0; i < s.length; i += 1) {
                    if (cur === s[i]) {
                        count += 1;
                    } else {
                        res += `${count}${cur}`;
                        count = 1;
                        cur = s[i];
                    }
                }

                if (count > 0) {
                    res += `${count}${cur}`;
                }

                return res;
            };

        return fn(n);
    };

}
