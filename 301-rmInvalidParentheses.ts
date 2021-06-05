namespace RemoveInvalidParentheses301 {

function removeInvalidParentheses(s: string): string[] {
    let len: number = 0;

    const
        res: Set<string> = new Set(),
        recurse = (cur: number, openCnt: number, exp: string): void => {
            if (cur === s.length) {
                // base case
                if (openCnt === 0) {
                    // balanced
                    if (exp.length > len) {
                        len = exp.length;
                        res.clear();
                        res.add(exp);
                    } else if (exp.length === len) {
                        res.add(exp);
                    }
                }
            } else {
                const c = s[cur];

                switch (c) {
                    case '(':
                        recurse(cur + 1, openCnt, exp); // skipped
                        recurse(cur + 1, openCnt + 1, exp + '(');
                        break;
                    case ')':
                        recurse(cur + 1, openCnt, exp); // skipped
                        if (openCnt > 0) {
                            recurse(cur + 1, openCnt - 1, exp + ')');
                        }
                        break;
                    default:
                        recurse(cur + 1, openCnt, exp + c);
                }
            }
        };

    recurse(0, 0, '');
    return [...res];
};

const f = (x: string) => console.log(removeInvalidParentheses(x));

f("(a)())()");
f("()())()");

}
