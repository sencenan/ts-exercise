namespace ThreeSum15 {

    const twoSum = (nums: number[], target: number, start: number): number[][] => {
        const
            ans: number[][] = [],
            map: Record<number, number> = {};

        for (let i = start; i < nums.length; i += 1) {
            if (map[nums[i]] !== undefined) {
                ans.push([nums[map[nums[i]]], nums[i]]);
            }

            map[target - nums[i]] = i;
        }

        return ans;
    };

    function threeSum(nums: number[]): number[][] {
        const
            visited: Set<string> = new Set(),
            ans: number[][] = [];

        for (let i = 0; i < nums.length; i += 1) {
            twoSum(nums, -nums[i], i + 1).forEach(
                pair => {
                    const triple = [nums[i], ...pair];
                    triple.sort((a, b) => a - b);

                    if (!visited.has('' + triple)) {
                        visited.add('' + triple);
                        ans.push(triple);
                    }
                }
            );
        }

        return ans;
    };

}
