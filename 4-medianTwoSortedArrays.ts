namespace MedianTwoSortedArrays4 {

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    let
        totalSize = nums1.length  + nums2.length,
        leftSize = Math.ceil(totalSize / 2);

    if (totalSize === 1) {
        return nums1.length ? nums1[0] : nums2[0];
    } else if (nums1.length === 0 || nums2.length === 0) {
        const nums = nums1.length ? nums1 : nums2;
        return totalSize % 2 === 0 ? (nums[leftSize - 1] + nums[leftSize]) / 2 : nums[leftSize - 1];
    }

    let
        lo = 0,
        hi = Math.min(leftSize, nums1.length);

    while (lo <= hi) {
        const // these cannot both be zero
            fromLeft = Math.floor((lo + hi) / 2),
            fromRight = leftSize - fromLeft;

        if (fromRight > nums2.length) {
            // there is not enough element in the right array take more left
            lo = fromLeft + 1;
            continue;
        }

        const
            maxLeft = fromLeft - 1 < 0 ? -Infinity : nums1[fromLeft - 1],
            maxRight = fromRight - 1 < 0 ? -Infinity : nums2[fromRight - 1],
            max = Math.max(maxLeft, maxRight),
            min = Math.min(
                fromLeft < nums1.length ? nums1[fromLeft] : Infinity,
                fromRight < nums2.length ? nums2[fromRight] : Infinity
            );

        if (max <= min) {
            // found
            if (totalSize % 2 === 1) {
                return max;
            } else {
                return (min + max) / 2;
            }
        } else {
            // max of left is greater than min of right
            // position of max of left will be pushed further right
            if (maxLeft < maxRight) {
                // too many from right
                lo = fromLeft + 1;
            } else {
                // too many from left
                hi = fromLeft - 1;
            }
        }
    }

    /*
    0 1 2 3 -4-> 0 1
    0 1 2 3 4 -5-> 0 1 2

    [1, 3] [2, 4, 5] [1, 2, 3, 4, 5]
    1 U 2 4 | 3 U 5 -> 4 > 3

    [1, 2] [3, 4, 5] [1, 2, 3, 4, 5]
    1 U 3 4 | 2 U 5 -> 4 > 2

    [2, 3, 4] [1, 5, 6] [1, 2, 3, 4, 5, 6]
    [2] U [1, 5] | 3, 4, 6 -> 5 > 3 // too many from right, max is from right

    [1, 2, 5, 6] [0, 3, 4] [0, 1, 2, 3, 4, 5, 6]
    [1, 2, 5] U [0] | 3, 4, 6 -> 5 > 3 // too many from left, max is from left
    */

    return 0;
};

let a: number[], b: number[];

a = [1, 2, 5, 6];
b = [0, 3, 4];
console.log(findMedianSortedArrays(a, b));

}
