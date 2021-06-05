namespace RunningSum1480 {

function runningSum(nums: number[]): number[] {
    return nums.slice(1).reduce((res, it) => res.concat(res[res.length - 1] + it), [nums[0]]);
};

}
