namespace LeastStops871 {

type comparator<T> = (l: T, r: T) => number;

interface MaxHeap<T> {
    insert: (n: T) => void;
    deleteMax: () => T | undefined;
    size: () => number;
    data:() => T[];
}

const maxHeap = <T>(compare: comparator<T>): MaxHeap<T> => {
    const
        arr: T[] = [],
        swap = (i: number, j: number) => {
            const tmp: T = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        },
        cmp = (i: number, j: number): number => compare(arr[i], arr[j]),
        parent = (i: number) => Math.floor((i - 1) / 2),
        children = (i: number) => [i * 2 + 1, i * 2 + 2],
        bubbleUp = (i: number) => {
            for (
                let p = parent(i);
                i > 0 && cmp(i, p) > 0;
                i = p, p = parent(p)
            ) {
                swap(i, p);
            }
        },
        dropDown = (i: number) => {
            if (i <= parent(arr.length - 1)) {
                const
                    [l, r] = children(i),
                    il = cmp(i, l),
                    ir = r < arr.length ? cmp(i, r) : Infinity;

                if (il < 0 || ir < 0) {
                    if (r < arr.length && cmp(l, r) < 0) {
                        swap(r, i);
                        dropDown(r);
                    } else {
                        swap(l, i);
                        dropDown(l);
                    }
                }
            }
        };

    const heap = {

        insert: (n: T) => {
            arr.push(n);
            bubbleUp(arr.length - 1);
        },

        deleteMax: () => {
            const max = arr[0];

            if (arr.length > 0) {
                swap(0, arr.length - 1);
                arr.pop();
                dropDown(0);
            }

            return max;
        },

        size: () => arr.length,
        data: () => arr

    }

    return heap;
};

//

function minRefuelStops(target: number, startFuel: number, stations: number[][]): number {
    let
        pos = startFuel,
        skipped: MaxHeap<number[]> = maxHeap((a, b) => a[1] - b[1]),
        stops = 0;

    while (pos < target) {
        if (stations.length > 0 && pos >= stations[0][0]) {
            // skip
            skipped.insert(stations.shift() as number[]);
        } else if (skipped.size() > 0) {
            // cannot reach to the next station and did not reach target
            const station = skipped.deleteMax() as number[];

            pos += station[1];
            stops += 1;
        } else {
            break;
        }
    }

    return pos >= target ? stops : -1;
};

//

let t: number, f: number, s: number[][];

// t = 1
// f = 1
// s = []
// console.log(minRefuelStops(t, f, s));

// t = 100
// f = 1
// s = [[10,100]]
// console.log(minRefuelStops(t, f, s));

// t = 100
// f = 10
// s = [[10,60],[20,30],[30,30],[60,40]]
// console.log(minRefuelStops(t, f, s));

// t = 999
// f = 1000
// s = [[5,100],[997,100],[998,100]]
// console.log(minRefuelStops(t, f, s));

t = 1000000
f = 70768
s = [[12575,171159],[81909,101253],[163732,164401],[190025,65493],[442889,31147],[481202,166081],[586028,206379],[591952,52748],[595013,9163],[611883,217156]]
console.log(minRefuelStops(t, f, s));

// const skipped: MaxHeap<number[]> = maxHeap((a, b) => a[1] - b[1]);
// s.map(it => skipped.insert(it));
// while (skipped.size()) {
//     console.log(skipped.deleteMax());
// }

}
