namespace ReverseLinkedListII92 {

    class ListNode {
        val: number
        next: ListNode | null
        constructor(val?: number, next?: ListNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.next = (next === undefined ? null : next)
        }
    }

    function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
        const
            reverse = (head: ListNode | null): ListNode | null => {
                if (head === null || head.next === null) {
                    return head;
                }

                const newHead = reverse(head.next);

                head.next.next = head; // reverse this link
                head.next = null;

                return newHead;
            };

        if (head === null) {
            return head;
        }

        let
            prev: ListNode | null = null,
            start: ListNode = head,
            end: ListNode = head,
            post: ListNode | null = null,
            i = 1;

        while (i < left) {
            i += 1;
            prev = start;
            start = start.next as ListNode;
        }

        end = start;
        while (i < right) {
            i += 1;
            end = end.next as ListNode;
        }
        post = end.next;

        // disconnect the segment
        if (prev !== null) {
            prev.next = null;
        }
        end.next = null;

        // reverse the segment
        const rHead = reverse(start);

        // reconnect;
        if (prev !== null) {
            prev.next = rHead;
        } else {
            head = prev = rHead;
        }
        start.next = post;

        return head;
    };

}
