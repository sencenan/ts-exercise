namespace BasicCalculator224 {

function calculate(s: string): number {
    const fn = (s: string): number => {
        if (s.length === 0) {
            return 0;
        }

        let
            lhs = 0,
            rhs = 0,
            sign = 1;

        for (let i = 0; i < s.length; i += 1) {
            switch (s[i]) {
                case '-':
                    lhs += sign * rhs;
                    rhs = 0;
                    sign = -1;
                    break;
                case '+':
                    lhs += sign * rhs;
                    rhs = 0;
                    sign = 1;
                    break;
                case '(':
                    let
                        start = i + 1,
                        cnt = 1;

                    i += 1;
                    while (cnt !== 0) {
                        switch (s[i]) {
                            case '(':
                                cnt += 1;
                                break;
                            case ')':
                                cnt -= 1;
                                break;
                        }

                        i += 1;
                    }
                    i -= 1; // points to the )

                    lhs += sign * fn(s.substring(start, i));
                    rhs = 0;
                    sign = 1;
                    break;
                default:
                    rhs = rhs * 10 + parseInt(s[i], 10);
            }
        }

        return lhs + rhs * sign;
    };

    return fn(s.replace(/ /g, ''));
};

console.log(calculate("(4)"));
console.log(calculate("(7)-(0)+(4)"));
console.log(calculate("- (3 + (4 + 5))"));
console.log(calculate(" 2-1 + 2 "));
console.log(calculate("2147483647"));

}
