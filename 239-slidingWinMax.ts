namespace SlidingWinMax239 {

    type Entry<T> = [number, T];

    interface PriorityQueue<T> {
        insert: (q: number, v: T) => void;
        deleteMax: () => Entry<T> | undefined;
        size: () => number;
        data:() => Entry<T>[];
    }

    const priorityQueue = <T>(): PriorityQueue<T> => {

        const
            arr: Entry<T>[] = [],
            swap = (i: number, j: number) => {
                const tmp: Entry<T> = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            },
            cmp = (i: number, j: number): number => arr[i][0] - arr[j][0],
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

        const queue = {

            insert: (p: number, v: T) => {
                arr.push([p, v]);
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

        return queue;
    };

    function maxSlidingWindow(nums: number[], k: number): number[] {
        const
            res: number[] = [],
            pQueue = priorityQueue<number>();

        for (let i = 0; i < k; i += 1) {
            pQueue.insert(nums[i], i);
        }
        res.push(pQueue.data()[0][0]);

        for (let i = k; i < nums.length; i += 1) {
            pQueue.insert(nums[i], i);

            while (pQueue.data()[0][1] <= i - k) {
               pQueue.deleteMax();
            }

            res.push(pQueue.data()[0][0]);
        }

        return res;
    };

}
