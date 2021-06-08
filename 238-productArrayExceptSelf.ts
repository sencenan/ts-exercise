namespace ProductExceptSelf238 {

    function productExceptSelf(nums: number[]): number[] {
        let res: number[] = [nums[0]];

        for (let i = 1; i < nums.length; i += 1) {
            res[i] = res[i - 1] * nums[i];
        }

        let prod = 1;
        for (let i = res.length - 1; i > 0; i -= 1) {
            res[i] = res[i - 1] * prod;
            prod = prod * nums[i];
        }
        res[0] = prod;

        return res;
    };

}
