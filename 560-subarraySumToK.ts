namespace SubarraySumToK560 {
    function subarraySum(nums: number[], k: number): number {
        const
            sums: Record<number, number> = { 0: 1 };

        let
            cnt = 0,
            sum = 0;

        for (const n of nums) {
            sum += n;

            if (sums[sum - k] !== undefined) {
                cnt += sums[sum - k];
            }

            if (sums[sum] === undefined) {
                sums[sum] = 0;
            }

            sums[sum] += 1;
        }

        return cnt;
    };
}
