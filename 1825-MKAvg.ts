namespace MKAvg {

class MKAverage {
    lastM: number[] = [];
    sorted: number[] = [];
    m: number;
    k: number;

    constructor(m: number, k: number) {
        this.m = m;
        this.k = k;
    }

    binarySearch(num: number): number {
        let
            lo = 0,
            hi = this.sorted.length;

        while (lo <= hi) {
            let
                mid = Math.floor((lo + hi) / 2),
                pivot = this.sorted[mid];

            if (pivot === num) {
                return mid;
            } else if (pivot < num) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return -lo;
    }

    addElement(num: number): void {
        this.sorted.splice(Math.abs(this.binarySearch(num)), 0, num);

        this.lastM.push(num);
        if (this.lastM.length > this.m) {
            let removeIdx = this.binarySearch(this.lastM.shift() as number);
            this.sorted.splice(removeIdx, 1);
        }
    }

    calculateMKAverage(): number {
        if (this.lastM.length < this.m) {
            return -1;
        }

        let
            sum = 0,
            cnt = 0;

        for (let i = this.k; i < this.sorted.length - this.k; i += 1) {
            sum += this.sorted[i];
            cnt += 1;
        }

        return Math.floor(sum / cnt);
    }
}

type FName = keyof MKAverage | 'MKAverage';

let
    inst: MKAverage,
    calls: FName[],
    args: number[][],
    res: (number | undefined)[];

calls = ["MKAverage","addElement","addElement","calculateMKAverage","addElement","addElement","calculateMKAverage","addElement","addElement","calculateMKAverage","addElement"];
args = [[3,1],[17612],[74607],[],[8272],[33433],[],[15456],[64938],[],[99741]]

res = calls.map((call, idx) => {
    switch (call) {
        case 'MKAverage':
            inst = new MKAverage(args[idx][0], args[idx][1]);
            return undefined;
        default:
            return (inst[call] as (_: any) => number).apply(inst, args[idx] as any);
    }
});

console.log(res);

}
