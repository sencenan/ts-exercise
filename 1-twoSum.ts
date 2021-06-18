namespace TwoSum1 {

    function twoSum(nums: number[], target: number): number[] {
        const
            compliments: Record<number, number> = {};

        for (let i = 0; i < nums.length; i += 1) {
            if (compliments[nums[i]] !== undefined) {
                return [compliments[nums[i]], i];
            }

            compliments[target - nums[i]] = i;
        }

        return [];
    };

}
