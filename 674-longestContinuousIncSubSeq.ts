namespace LongestContinuousIncSubSeq {

    function findLengthOfLCIS(nums: number[]): number {
        let
            max = 1,
            start = 0,
            end = 0;

        for (end = 0; end < nums.length; end += 1) {
            if (start < end) {
                if (nums[end - 1] >= nums[end]) {
                    // end of a slice
                    max = Math.max(max, end - start);
                    start = end;
                }
            }
        }

        return max = Math.max(max, end - start);
    };

}
