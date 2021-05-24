namespace BugHome {

function minimumJumps(forbidden: number[], a: number, b: number, x: number): number {
    type Node = [number, number, number];

    const
        isForbidden = forbidden.reduce(
            (map, pos) => (map[pos] = true, map),
            {} as {[_: number]: boolean}
        ),
        visited: { [_: number]: boolean } = [],
        bfs = (pending: Node[]): number => {
            while (pending.length) {
                const [pos, cost, fromBack] = pending.shift() as Node;

                if (pos === x) {
                    return cost;
                }

                if (visited[fromBack * pos]) {
                    continue;
                }
                visited[fromBack * pos] = true;

                const
                    nextForward: Node = [pos + a, cost + 1, 1],
                    nextBackward: Node = [pos - b, cost + 1, -1];

                if (!isForbidden[nextForward[0]] && nextForward[0] <= 6000) {
                    pending.push(nextForward);
                }

                if (
                    !isForbidden[nextBackward[0]]
                    && nextBackward[0] >= 0
                    && fromBack != -1
                ) {
                    pending.push(nextBackward);
                }
            }

            return -1;
        };

    return bfs([[0, 0, 1]]);
};

let f: number[], a: number, b: number, x: number;

f=[162,118,178,152,167,100,40,74,199,186,26,73,200,127,30,124,193,84,184,36,103,149,153,9,54,154,133,95,45,198,79,157,64,122,59,71,48,177,82,35,14,176,16,108,111,6,168,31,134,164,136,72,98]
a=29
b=98
x=80
console.log(minimumJumps(f, a, b, x));

// f=[8,3,16,6,12,20]
// a=15
// b=13
// x=11
// console.log(minimumJumps(f, a, b, x));

// f=[61,104,19,60,68,157,183,148,116,93,190,13,177,47,15,133,111]
// a=75
// b=165
// x=150

// console.log(minimumJumps(f, a, b, x));

// f=[14,4,18,1,15]
// a=3
// b=15
// x=9

// console.log(minimumJumps(f, a, b, x));

}
