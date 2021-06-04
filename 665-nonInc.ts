namespace Q665 {

    function checkPossibility(nums: number[]): boolean {
        let changedCnt = 0;

        for (let i = 1; i < nums.length && changedCnt < 2; i += 1) {
            if (nums[i - 1] > nums[i]) {
                changedCnt += 1;

                if (i - 2 < 0 || nums[i - 2] <= nums[i]) {
                    // option 1/2: decrease lhs to be the same as rhs
                    nums[i - 1] = nums[i];
                } else {
                    // option 2/2: increase rhs to be the same as lhs
                    nums[i] = nums[i - 1];
                }
            }
        }

        return changedCnt < 2;
    };

}
