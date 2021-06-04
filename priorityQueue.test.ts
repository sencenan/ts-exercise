namespace PriorityQueue {

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

    // test

    describe('PriorityQueue', () => {

        it('trivial cases', () => {
            const queue = priorityQueue<number>();

            expect(queue.size()).toBe(0);

            queue.insert(1, 1);
            expect(queue.size()).toBe(1);
            expect(queue.deleteMax()).toEqual([1, 1]);
            expect(queue.size()).toBe(0);

            expect(queue.deleteMax()).toBe(undefined);
            expect(queue.size()).toBe(0);
        });

        it('in-order', () => {
            const queue = priorityQueue<number>();

            queue.insert(1, 1);
            queue.insert(2, 2);
            queue.insert(3, 3);
            queue.insert(4, 4);
            queue.insert(5, 5);
            expect(queue.size()).toBe(5);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.deleteMax()).toEqual([3, 3]);
            expect(queue.deleteMax()).toEqual([2, 2]);
            expect(queue.deleteMax()).toEqual([1, 1]);
            expect(queue.size()).toBe(0);
        });

        it('reverse-order', () => {
            const queue = priorityQueue<number>();

            queue.insert(5, 5);
            queue.insert(4, 4);
            queue.insert(3, 3);
            queue.insert(2, 2);
            queue.insert(1, 1);
            expect(queue.size()).toBe(5);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.deleteMax()).toEqual([3, 3]);
            expect(queue.deleteMax()).toEqual([2, 2]);
            expect(queue.deleteMax()).toEqual([1, 1]);
            expect(queue.size()).toBe(0);
        });

        it('out-of-order', () => {
            const queue = priorityQueue<number>();

            queue.insert(3, 3);
            queue.insert(5, 5);
            queue.insert(4, 4);
            queue.insert(1, 1);
            queue.insert(2, 2);
            expect(queue.size()).toBe(5);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.deleteMax()).toEqual([3, 3]);
            expect(queue.deleteMax()).toEqual([2, 2]);
            expect(queue.deleteMax()).toEqual([1, 1]);
            expect(queue.size()).toBe(0);
        });

        it('random delete and insert', () => {
            const queue = priorityQueue<number>();

            queue.insert(3, 3);
            queue.insert(5, 5);
            queue.insert(4, 4);
            expect(queue.size()).toBe(3);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.size()).toBe(2);

            queue.insert(1, 1);
            queue.insert(2, 2);
            expect(queue.size()).toBe(4);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.size()).toBe(3);
            expect(queue.deleteMax()).toEqual([3, 3]);
            expect(queue.size()).toBe(2);

            queue.insert(10, 10);
            queue.insert(8, 8);
            expect(queue.size()).toBe(4);
            expect(queue.deleteMax()).toEqual([10, 10]);
            expect(queue.size()).toBe(3);
            expect(queue.deleteMax()).toEqual([8, 8]);
            expect(queue.size()).toBe(2);
        });

        it('duplicated', () => {
            const queue = priorityQueue<number>();

            queue.insert(5, 5);
            queue.insert(5, 5);
            queue.insert(5, 5);
            expect(queue.size()).toBe(3);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.size()).toBe(2);

            queue.insert(4, 4);
            queue.insert(4, 4);
            queue.insert(3, 3);
            expect(queue.size()).toBe(5);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.size()).toBe(4);
            expect(queue.deleteMax()).toEqual([5, 5]);
            expect(queue.size()).toBe(3);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.size()).toBe(2);
            expect(queue.deleteMax()).toEqual([4, 4]);
            expect(queue.size()).toBe(1);
            expect(queue.deleteMax()).toEqual([3, 3]);
            expect(queue.size()).toBe(0);
            expect(queue.deleteMax()).toBe(undefined);
            expect(queue.size()).toBe(0);
        });
    });

}
