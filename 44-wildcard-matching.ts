namespace Wildcard {

    const
        match = (s: string, p: string): boolean => {
            while (s.length || p.length) {
                if (p[0] === '*') {
                    // handling *, remove the * from pattern
                    // consecutive * is the same as a single star
                    while (p[0] === '*') {
                        p = p.substring(1);
                    }

                    if (p.length) {
                        for (let i = 0; i < s.length; i += 1) {
                            if (s[i] === p[0] || p[0] === '?') {
                                if (isMatch(s.substring(i), p)) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    } else {
                        return true;
                    }
                } else if (s[0] === p[0] || (p[0] === '?' && s[0] !== undefined)) {
                    s = s.substring(1);
                    p = p.substring(1);
                } else {
                    return false;
                }
            }

            return true;
        },
        memo: { [_: string]: boolean } = {};

    function isMatch(s: string, p: string): boolean {
        const key = `${s},${p}`;

        if (memo[key] === undefined) {
            memo[key] = match(s, p);
        }

        return memo[key];
    };

    let s: string, p: string;

    s = "c"
    p = "*?*"
    console.log(isMatch(s, p));

    s = "decbbbbb"
    p = "*b"
    console.log(isMatch(s, p));

    s = "abbabaaabbaa"
    p = "**aa"
    console.log(isMatch(s, p));

    s = "abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb"
    p = "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb"
    console.log(isMatch(s, p));

    s = 'aabb'
    p = 'aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb'
    console.log(isMatch(s, p));

}
