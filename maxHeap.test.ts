namespace MaxHeap {

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

    const cmp = (a: number, b: number): number => a - b;

    describe('MaxHeap', () => {

        it('trivial cases', () => {
            const heap = maxHeap(cmp);

            expect(heap.size()).toBe(0);

            heap.insert(1);
            expect(heap.size()).toBe(1);
            expect(heap.deleteMax()).toBe(1);
            expect(heap.size()).toBe(0);

            expect(heap.deleteMax()).toBe(undefined);
            expect(heap.size()).toBe(0);
        });

        it('in-order', () => {
            const heap = maxHeap(cmp);

            heap.insert(1);
            heap.insert(2);
            heap.insert(3);
            heap.insert(4);
            heap.insert(5);
            expect(heap.size()).toBe(5);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.deleteMax()).toBe(3);
            expect(heap.deleteMax()).toBe(2);
            expect(heap.deleteMax()).toBe(1);
            expect(heap.size()).toBe(0);
        });

        it('reverse-order', () => {
            const heap = maxHeap(cmp);

            heap.insert(5);
            heap.insert(4);
            heap.insert(3);
            heap.insert(2);
            heap.insert(1);
            expect(heap.size()).toBe(5);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.deleteMax()).toBe(3);
            expect(heap.deleteMax()).toBe(2);
            expect(heap.deleteMax()).toBe(1);
            expect(heap.size()).toBe(0);
        });

        it('out-of-order', () => {
            const heap = maxHeap(cmp);

            heap.insert(3);
            heap.insert(5);
            heap.insert(4);
            heap.insert(1);
            heap.insert(2);
            expect(heap.size()).toBe(5);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.deleteMax()).toBe(3);
            expect(heap.deleteMax()).toBe(2);
            expect(heap.deleteMax()).toBe(1);
            expect(heap.size()).toBe(0);
        });

        it('random delete and insert', () => {
            const heap = maxHeap(cmp);

            heap.insert(3);
            heap.insert(5);
            heap.insert(4);
            expect(heap.size()).toBe(3);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.size()).toBe(2);

            heap.insert(1);
            heap.insert(2);
            expect(heap.size()).toBe(4);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.size()).toBe(3);
            expect(heap.deleteMax()).toBe(3);
            expect(heap.size()).toBe(2);

            heap.insert(10);
            heap.insert(8);
            expect(heap.size()).toBe(4);
            expect(heap.deleteMax()).toBe(10);
            expect(heap.size()).toBe(3);
            expect(heap.deleteMax()).toBe(8);
            expect(heap.size()).toBe(2);
        });

        it('duplicated', () => {
            const heap = maxHeap(cmp);

            heap.insert(5);
            heap.insert(5);
            heap.insert(5);
            expect(heap.size()).toBe(3);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.size()).toBe(2);

            heap.insert(4);
            heap.insert(4);
            heap.insert(3);
            expect(heap.size()).toBe(5);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.size()).toBe(4);
            expect(heap.deleteMax()).toBe(5);
            expect(heap.size()).toBe(3);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.size()).toBe(2);
            expect(heap.deleteMax()).toBe(4);
            expect(heap.size()).toBe(1);
            expect(heap.deleteMax()).toBe(3);
            expect(heap.size()).toBe(0);
            expect(heap.deleteMax()).toBe(undefined);
            expect(heap.size()).toBe(0);
        });

        it('with comparator', () => {

            const heap: MaxHeap<number[]> = maxHeap((a, b) => a[1] - b[1]);

            const data = [
                [163732, 164401], [81909, 101253], [190025, 65493]
            ];

            heap.insert(data[0]);
            heap.insert(data[1]);
            heap.insert(data[2]);
            expect(heap.data()).toEqual(data);

            expect(heap.deleteMax()).toEqual(data[0]);
            expect(heap.deleteMax()).toEqual(data[1]);
            expect(heap.deleteMax()).toEqual(data[2]);
            expect(heap.deleteMax()).toEqual(undefined);
        });
    });

}
