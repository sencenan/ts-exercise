namespace WaysAddParentheses241 {

type OP = '+' | '-' | '*';

const
    parseOp = (s: string): OP | undefined => (s === '+' || s === '-' || s === '*') ? s : undefined,
    calculate = (l: number, op: OP, r: number): number => {
        switch (op) {
            case '+': return l + r;
            case '-': return l - r;
            case '*': return l * r;
        }
    }

function diffWaysToCompute(exp: string): number[] {
    if (exp.length === 0) {
        return [];
    }

    const res: number[] = [];
    let op: OP | undefined;

    for (let i = 0; i < exp.length; i += 1) {
        const cur = parseOp(exp[i]);

        if (typeof cur !== 'undefined') {
            op = cur;

            const
                lhs = diffWaysToCompute(exp.substring(0, i)),
                rhs = diffWaysToCompute(exp.substring(i + 1));

            lhs.forEach(
                l => rhs
                    .map(r => calculate(l, cur, r))
                    .forEach(x => res.push(x))
            );
        }
    }

    if (op === undefined) {
        return [parseInt(exp)];
    }

    return res;
};

console.log(diffWaysToCompute("2*3-4*5"));

}
