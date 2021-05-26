namespace LeastStops871 {

type comparator<T> = (l: T, r: T) => number;

interface MaxHeap<T> {
    insert: (n: T) => void;
    deleteMax: () => T | undefined;
    size: () => number;
    data:() => T[];
}

const maxHeap = <T>(cmp: comparator<T>): MaxHeap<T> => {
    const arr: T[] = [];

    const heap = {

        insert: (n: T) => {
            arr.push(n);

            for (
                let i = arr.length - 1, p = Math.floor((i - 1) / 2);
                i > 0 && cmp(arr[i], arr[p]) > 0;
                i = p, p = Math.floor((i - 1) / 2)
            ) {
                const tmp = arr[i];
                arr[i] = arr[p];
                arr[p] = tmp;
            }
        },

        deleteMax: () => {
            if (arr.length === 0) {
                return undefined;
            }

            const max = arr.shift();

            if (arr.length > 0) {
                arr.unshift(arr.pop() as T);

                let i = 0;
                while (i * 2 + 1 < arr.length) {
                    const
                        l = i * 2 + 1,
                        r = l + 1;

                    let maxIdx = r;

                    if (r >= arr.length || cmp(arr[l], arr[r]) > 0) {
                        maxIdx = l;
                    }

                    const tmp = arr[i];
                    arr[i] = arr[maxIdx];
                    arr[maxIdx] = tmp;

                    i = maxIdx;
                }

                for (
                    let i = 0, f = 2 * i + 1;
                    f < arr.length && cmp(arr[i], arr[f]) < 0;
                    i = f, f = 2 * i + 1
                ) {
                    const tmp = arr[i];
                    arr[i] = arr[f];
                    arr[f] = tmp;
                }
            }

            return max;
        },

        size: () => arr.length,
        data: () => arr

    }

    return heap;
};

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

// const heap: MaxHeap<number> = maxHeap((a, b) => a - b);
// heap.insert(3);
// heap.insert(5);
// heap.insert(6);
// heap.insert(10);
// heap.insert(7);
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.deleteMax(), heap.data());
// console.log(heap.data().length);

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
