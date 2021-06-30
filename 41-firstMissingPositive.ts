namespace FirstMissingPositive41 {

    function firstMissingPositive(nums: number[]): number {
        let hasOne = false;

        for (let i = 0; i < nums.length; i += 1) {
          if (nums[i] === 1) {
              hasOne = true;
          }
          if (nums[i] <= 0 || nums[i] > nums.length) {
            nums[i] = 1;
          }
        }

        if (!hasOne) {
            return 1;
        }

        for (let i = 0; i < nums.length; i += 1) {
          const idx = Math.abs(nums[i]) % nums.length;

          if (nums[idx] > 0) {
            nums[idx] *= -1;
          }
        }

        for (let i = 1; i < nums.length; i += 1) {
          if (nums[i] > 0) {
            return i;
          }
        }

        return nums[0] > 0 ? nums.length : nums.length + 1;
      };

}
