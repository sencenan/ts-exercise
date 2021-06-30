namespace MultiplyString43 {

    function multiply(num1: string, num2: string): string {
        const res: number[] = new Array(num1.length + num2.length - 1).fill(0);

        for (let i = num1.length - 1; i >= 0; i -= 1) {
            for (let j = num2.length - 1; j >= 0; j -= 1) {
                const
                    u = parseInt(num1[i]),
                    v = parseInt(num2[j]),
                    pos = i + j;

                res[pos] += u * v;
            }
        }

        let carry = 0;
        for (let i = res.length - 1; i >= 0; i -= 1) {
            const v = carry + res[i];

            if (i > 0) {
                res[i] = v % 10;
                carry = Math.floor(v / 10);
            } else {
                res[i] = v;
            }
        }

        let i = 0;
        while (res[i] === 0 && i < res.length - 1) {
            i += 1;
        }

        return res.slice(i).join('');
    };

}
