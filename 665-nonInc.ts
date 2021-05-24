namespace Q665 {

    function checkPossibility(nums: number[]): boolean {
        let nNega = 0;

        for (let i = 1; i < nums.length; i += 1) {
            const diff = nums[i] - nums[i - 1];

            if (diff < 0) {
                nNega += 1;
            }

            if (nNega > 1) {
                return false;
            }
        }

        return nNega <= 1;
    };

}
