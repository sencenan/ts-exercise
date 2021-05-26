namespace MaxHeap {

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

}
