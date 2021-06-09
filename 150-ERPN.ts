namespace ERPN150 {
    function evalRPN(tokens: string[]): number {
        const stack: number[] = [];

        while (tokens.length > 0) {
            const t = tokens.shift() as string;

            let l: number, r: number;

            switch (t) {
                case '+':
                    r = stack.pop() as number,
                    l = stack.pop() as number;
                    stack.push(l + r);
                    break;
                case '-':
                    r = stack.pop() as number,
                    l = stack.pop() as number;
                    stack.push(l - r);
                    break;
                case '*':
                    r = stack.pop() as number,
                    l = stack.pop() as number;
                    stack.push(r * r);
                    break;
                case '/':
                    r = stack.pop() as number,
                    l = stack.pop() as number;
                    let v = l / r;

                    if (v > 0) {
                        v = Math.floor(v);
                    } else {
                        v = Math.ceil(v);
                    }

                    stack.push(v);
                    break;
                default:
                    stack.push(parseInt(t, 10));
            }
        }

        return stack[0];
    };
}
