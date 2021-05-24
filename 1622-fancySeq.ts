namespace FancySeq {

const MAX = Math.pow(10, 9) + 7; // this is a prime number! it is co-prime with everyone

const
    // for any a, b; a >= b, return [x,y,gcd(a,b)], s.t. x*a + y*b = gcd(a,b)
    eGCD = (a: number, b: number): [number, number, number] => {
        if (b === 0) {
            return [1, 0, a];
        } else {
            const [x, y, gcd] = eGCD(b, a % b);
            return [y, x - Math.floor(a / b) * y, gcd];
        }
    },
    // m^-1 mod MAX
    invPow = (m: number): number => {
        const inv = eGCD(MAX, m)[1];
        return inv < 0 ? inv + MAX : inv;
    },
    modBig = (a: bigint, b: bigint = BigInt(MAX)): bigint => (a % b + b) % b;

const invTable = [...Array(101)].map((_, idx) => BigInt(invPow(idx)));

class Fancy {
    a: number;
    aInv: bigint;
    b: number;
    values: bigint[];
    cache: { [_: number]: number; };

    constructor() {
        this.a = 1;
        this.aInv = BigInt(1);
        this.b = 0;
        this.values = [];
        this.cache = {};
    }

    append(val: number): void {
        this.values.push(BigInt(val - this.b) * this.aInv);
    }

    addAll(inc: number): void {
        if (this.values.length) {
            this.b += inc;
            this.cache = {};
        }
    }

    multAll(m: number): void {
        if (this.values.length) {
            this.a = this.a * m % MAX;
            this.b = this.b * m % MAX;
            this.aInv = modBig(this.aInv * invTable[m]);
            this.cache = {};
        }
    }

    getIndex(idx: number): number {
        if (idx >= this.values.length) {
            return -1;
        } else {
            if (this.cache[idx] === undefined) {
                this.cache[idx] = Number(modBig(
                    BigInt(this.a) * this.values[idx] + BigInt(this.b)
                ));
            }

            return this.cache[idx];
        }
    }
}

}
