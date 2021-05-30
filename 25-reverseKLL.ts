namespace ReverseKLL {

    class ListNode {
        val: number
        next: ListNode | null
        constructor(val?: number, next?: ListNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.next = (next === undefined ? null : next)
        }
    }

    function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
        let
            res: ListNode | null = null,
            prev: ListNode | null = null;

        const
            stack: number[] = [],
            stackToList = (reverse: boolean = true) => {
                let
                    fst: ListNode | null = null,
                    last: ListNode | null = fst;

                while (stack.length > 0) {
                    const node = new ListNode(reverse ? stack.pop() : stack.shift());

                    if (last === null) {
                        last = fst = node;
                    } else {
                        last.next = node;
                        last = node;
                    }
                }

                if (prev === null) {
                    res = fst;
                } else {
                    prev.next = fst;
                }

                prev = last;
            };

        while (head !== null) {
            stack.push(head.val);

            if (stack.length === k) {
                stackToList();
            }

            head = head.next;
        }

        if (stack.length > 0) {
            stackToList(false);
        }

        return res;
    };
}
