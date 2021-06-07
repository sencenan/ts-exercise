namespace AddBinary67 {

function addBinary(a: string, b: string): string {
    let
        res = '',
        carry = false;

    if (a.length < b.length) {
        let tmp = a;
        a = b;
        b = tmp;
    }

    for (let i = 0; i < b.length; i += 1) {
        const
            la = a[a.length - i - 1],
            lb = b[b.length - i - 1];

        if (la !== lb) {
            if (carry) {
                res = '0' + res;
            } else {
                res = '1' + res;
            }
        } else {
            if (la === '0') {
                if (carry) {
                    res = '1' + res;
                    carry = false;
                } else {
                    res = '0' + res;
                }
            } else {
                // 1 1
                if (carry) {
                    res = '1' + res;
                } else {
                    res = '0' + res;
                }
                carry = true;
            }
        }
    }

    if (carry) {
        if (a.length === b.length) {
            res = '1' + res;
        } else {
            const lastZero = a.lastIndexOf('0', a.length - b.length - 1);

            if (lastZero === -1) {
                // it's all 1's ahead
                res = '1' + new Array(a.length - b.length).fill('0').join('') + res;
            } else {
                res = a.substring(0, lastZero)
                    + '1' // switch zero to 1
                    + new Array(a.length - b.length - lastZero - 1).fill(0).join('')
                    + res;
            }
        }
    } else {
        res = a.substring(0, a.length - b.length) + res;
    }

    return res;
};

}
