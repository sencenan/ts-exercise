namespace SplitSameAvg {

function splitArraySameAverage_(nums: number[]): boolean {
    for (let i = 1; i <= Math.pow(2, nums.length - 1) - 1; i += 1) {
        let
            lSum = 0,
            lCount = 0,
            rSum = 0,
            rCount = 0,
            code = i;

        for (let j = 0; j < nums.length; j += 1) {
            // 0 left
            // 1 right

            if (code % 2 === 0) {
                lSum += nums[j];
                lCount += 1;
            } else {
                rSum += nums[j];
                rCount += 1;
            }

            code = Math.floor(code / 2);
        }

        if (lSum / lCount === rSum / rCount) {
            return true;
        }
    }

    return false;
};

function splitArraySameAverage(nums: number[]): boolean {
    const
        total = nums.reduce((sum, it) => sum + it, 0),
        set = new Set<number>();

    nums = nums.map(x => x * nums.length - total).sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 1; i += 1) {
        const subSet = new Set<number>();

        subSet.add(nums[i]);

        for (const v of set) {
            if (v < 0) {
                subSet.add(v + nums[i]);
            }
        }

        for (const v of subSet) {
            set.add(v);
        }

        if (set.has(0)) {
            return true;
        }
    }

    return false;
}

let s: number[];

// s= [1,2,3];
// console.log(splitArraySameAverage(s));

s= [1,2,3,4,5,6,7,8];
console.log(splitArraySameAverage(s));

s = [60,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30];
console.log(splitArraySameAverage(s));

// s = [3863,703,1799,327,3682,4330,3388,6187,5330,6572,938,6842,678,9837,8256,6886,2204,5262,6643,829,745,8755,3549,6627,1633,4290,7];
// console.log(splitArraySameAverage(s));

}
