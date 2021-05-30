namespace MergeKSortedLL {

    class ListNode {
        val: number
        next: ListNode | null
        constructor(val?: number, next?: ListNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.next = (next === undefined ? null : next)
        }
    }

    function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
        let
            head: ListNode | null = null,
            prev: ListNode | null = null;

        while (lists.length > 0) {
            let
                min = Infinity,
                minIdx = -1,
                toRemove = [];

            for (let i = 0; i < lists.length; i += 1) {
                const node = lists[i]; // declaring variable to help compiler out

                if (node === null) {
                    toRemove.push(i);
                } else if (min > node.val) {
                    min = node.val;
                    minIdx = i;
                }
            }

            if (minIdx >= 0) {
                const node = new ListNode(min);
                lists[minIdx] = (lists[minIdx] as ListNode).next;

                if (prev === null) {
                    prev = head = node;
                } else {
                    prev.next = node;
                    prev = prev.next;
                }
            }

            for (let i = 0; i < toRemove.length; i += 1) {
                lists.splice(toRemove[i] - i, 1);
            }
        }

        return head;
    };

}
