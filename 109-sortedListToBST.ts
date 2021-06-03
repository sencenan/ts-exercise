namespace SortedListToBST109 {

    class ListNode {
        val: number
        next: ListNode | null
        constructor(val?: number, next?: ListNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.next = (next === undefined ? null : next)
        }
    }

    class TreeNode {
        val: number
        left: TreeNode | null
        right: TreeNode | null
        constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.left = (left === undefined ? null : left)
            this.right = (right === undefined ? null : right)
        }
    }

    function sortedListToBST(head: ListNode | null): TreeNode | null {
        'use strict';

        let
            prev: ListNode = head as ListNode,
            mid: ListNode = prev,
            cur: ListNode | null = head,
            count: number = 0;

        while (cur != null) {
            cur = cur.next;

            if (count % 2) {
                prev = mid;

                if (mid.next) {
                    mid = mid.next;
                }
            }

            count += 1;
        }

        if (count === 0) {
            return null;
        }
        if (count === 1) {
            return new TreeNode((head as ListNode).val);
        }

        // cut LHS
        prev.next = null;

        return new TreeNode(
            mid.val,
            sortedListToBST(head),
            mid.next ? sortedListToBST(mid.next) : null
        );
    };

}
