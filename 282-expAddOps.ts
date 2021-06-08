namespace ExpAddOps282 {

function addOperators(num: string, target: number): string[] {
    const
        ans: string[] = [],
        helper = (i: number, [val, pre, leftOver]: [number, number, number], exp: string) => {
            if (i === num.length) {
                if (val === target && leftOver === 0) {
                    ans.push(exp);
                }
                return;
            }

            const cur = leftOver * 10 + parseInt(num[i], 10);

            if (cur !== 0) {
                // expand lhs
                helper(i + 1, [val, pre, cur], exp);
            }

            if (exp.length > 0) {
                helper(i + 1, [val + cur, cur, 0], exp + '+' + cur);
                helper(i + 1, [val - cur, -cur, 0], exp + '-' + cur);
                helper(i + 1, [val - pre + cur * pre, pre * cur, 0], exp + '*' + cur);
            } else {
                helper(i + 1, [val + cur, cur, 0], '' + cur);
            }
        }

    helper(0, [0, 0, 0], '');
    return ans;
};

console.log(addOperators('123', 6));

}
