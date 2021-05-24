namespace MaxNum321 {

const
    trim = (nums: number[], maxLen: number, memo: { [_: string]: number[] } = {}): number[] => {
        const key = nums + '|' + maxLen;

        if (memo[key] === undefined) {
            const result = [];
            let maxDrop = nums.length - maxLen;

            for (let i = 0; i < nums.length; i += 1) {
                while (maxDrop > 0 && result.length && result[result.length - 1] < nums[i]) {
                    result.pop();
                    maxDrop -= 1;
                }

                result.push(nums[i]);
            }

            memo[key] = result.slice(0, maxLen);
        }

        return memo[key];
    },
    merge = (nums1: number[], nums2: number[]): number[] => {
        let result: number[] = [];

        while (nums1.length > 0 || nums2.length > 0) {
            if (nums1[0] === nums2[0]) {
                let i = 1;
                while (i < nums1.length && i < nums2.length && nums1[i] === nums2[i]) {
                    i += 1;
                }

                if (i === nums1.length) {
                    result.push(nums2.shift() as number);
                } else if (i === nums2.length) {
                    result.push(nums1.shift() as number);
                } else if (nums1[i] < nums2[i]) {
                    result.push(nums2.shift() as number);
                } else { // nums1[i] > nums2[i]
                    result.push(nums1.shift() as number);
                }
            } else if (nums2.length === 0 || nums1[0] > nums2[0]) {
                result.push(nums1.shift() as number);
            } else {
                result.push(nums2.shift() as number);
            }
        }

        return result;
    },
    max = (nums1: number[], nums2: number[]): number[] => {
        if (nums1.length === nums2.length) {
            for (let i = 0; i < nums1.length; i += 1) {
                if (nums1[i] > nums2[i]) {
                    return nums1;
                } else if (nums1[i] < nums2[i]) {
                    return nums2;
                }
            }

            return nums1;
        } else {
            return nums1.length > nums2.length ? nums1 : nums2;
        }
    };

function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
    let res: number[] = [];

    if (nums2.length + nums1.length <= k) {
        return merge(nums1, nums2);
    }

    for (let i = 0; i <= k; i += 1) {
        const
            l = trim(nums1, i),
            r = trim(nums2, k - i);

        res = max(res, merge(l, r));
    }

    return res;
};

    let i: number[], o: number[], k: number;

    i = [2,5,6,4,4,0];
    o = [7,3,8,0,6,5,7,6,2];
    k = 15;
    console.log(maxNumber(i, o ,k));

    i = [6,7];
    o = [6,0,4];
    k = 5;
    console.log(maxNumber(i, o ,k));

    i = [3,4,6,5];
    o = [9,1,2,5,8,3];
    k = 5;
    console.log(maxNumber(i, o ,k));

    i = [8,9,7,3,5,9,1,0,8,5,3,0,9,2,7,4,8,9,8,1,0,2,0,2,7,2,3,5,4,7,4,1,4,0,1,4,2,1,3,1,5,3,9,3,9,0,1,7,0,6,1,8,5,6,6,5,0,4,7,2,9,2,2,7,6,2,9,2,3,5,7,4,7,0,1,8,3,6,6,3,0,8,5,3,0,3,7,3,0,9,8,5,1,9,5,0,7,9,6,8,5,1,9,6,5,8,2,3,7,1,0,1,4,3,4,4,2,4,0,8,4,6,5,5,7,6,9,0,8,4,6,1,6,7,2,0,1,1,8,2,6,4,0,5,5,2,6,1,6,4,7,1,7,2,2,9,8,9,1,0,5,5,9,7,7,8,8,3,3,8,9,3,7,5,3,6,1,0,1,0,9,3,7,8,4,0,3,5,8,1,0,5,7,2,8,4,9,5,6,8,1,1,8,7,3,2,3,4,8,7,9,9,7,8,5,2,2,7,1,9,1,5,5,1,3,5,9,0,5,2,9,4,2,8,7,3,9,4,7,4,8,7,5,0,9,9,7,9,3,8,0,9,5,3,0,0,3,0,4,9,0,9,1,6,0,2,0,5,2,2,6,0,0,9,6,3,4,1,2,0,8,3,6,6,9,0,2,1,6,9,2,4,9,0,8,3,9,0,5,4,5,4,6,1,2,5,2,2,1,7,3,8,1,1,6,8,8,1,8,5,6,1,3,0,1,3,5,6,5,0,6,4,2,8,6,0,3,7,9,5,5,9,8,0,4,8,6,0,8,6,6,1,6,2,7,1,0,2,2,4,0,0,0,4,6,5,5,4,0,1,5,8,3,2,0,9,7,6,2,6,9,9,9,7,1,4,6,2,8,2,5,3,4,5,2,4,4,4,7,2,2,5,3,2,8,2,2,4,9,8,0,9,8,7,6,2,6,7,5,4,7,5,1,0,5,7,8,7,7,8,9,7,0,3,7,7,4,7,2,0,4,1,1,9,1,7,5,0,5,6,6,1,0,6,9,4,2,8,0,5,1,9,8,4,0,3,1,2,4,2,1,8,9,5,9,6,5,3,1,8,9,0,9,8,3,0,9,4,1,1,6,0,5,9,0,8,3,7,8,5]
    o = [7,8,4,1,9,4,2,6,5,2,1,2,8,9,3,9,9,5,4,4,2,9,2,0,5,9,4,2,1,7,2,5,1,2,0,0,5,3,1,1,7,2,3,3,2,8,2,0,1,4,5,1,0,0,7,7,9,6,3,8,0,1,5,8,3,2,3,6,4,2,6,3,6,7,6,6,9,5,4,3,2,7,6,3,1,8,7,5,7,8,1,6,0,7,3,0,4,4,4,9,6,3,1,0,3,7,3,6,1,0,0,2,5,7,2,9,6,6,2,6,8,1,9,7,8,8,9,5,1,1,4,2,0,1,3,6,7,8,7,0,5,6,0,1,7,9,6,4,8,6,7,0,2,3,2,7,6,0,5,0,9,0,3,3,8,5,0,9,3,8,0,1,3,1,8,1,8,1,1,7,5,7,4,1,0,0,0,8,9,5,7,8,9,2,8,3,0,3,4,9,8,1,7,2,3,8,3,5,3,1,4,7,7,5,4,9,2,6,2,6,4,0,0,2,8,3,3,0,9,1,6,8,3,1,7,0,7,1,5,8,3,2,5,1,1,0,3,1,4,6,3,6,2,8,6,7,2,9,5,9,1,6,0,5,4,8,6,6,9,4,0,5,8,7,0,8,9,7,3,9,0,1,0,6,2,7,3,3,2,3,3,6,3,0,8,0,0,5,2,1,0,7,5,0,3,2,6,0,5,4,9,6,7,1,0,4,0,9,6,8,3,1,2,5,0,1,0,6,8,6,6,8,8,2,4,5,0,0,8,0,5,6,2,2,5,6,3,7,7,8,4,8,4,8,9,1,6,8,9,9,0,4,0,5,5,4,9,6,7,7,9,0,5,0,9,2,5,2,9,8,9,7,6,8,6,9,2,9,1,6,0,2,7,4,4,5,3,4,5,5,5,0,8,1,3,8,3,0,8,5,7,6,8,7,8,9,7,0,8,4,0,7,0,9,5,8,2,0,8,7,0,3,1,8,1,7,1,6,9,7,9,7,2,6,3,0,5,3,6,0,5,9,3,9,1,1,0,0,8,1,4,3,0,4,3,7,7,7,4,6,4,0,0,5,7,3,2,8,5,1,4,5,8,5,6,7,5,7,3,3,9,6,8,1,5,1,1,1,0,3]
    k = 500
    console.log(maxNumber(i, o ,k));

    i = [1,0,1,2,0,0,0,2,0,1,0,1,2,0,0,2,1,1,1,2,1,0,0,0,0,2,1,1,1,1,1,1,0,2,2,1,2,0,1,2,2,0,1,2,1,2,0,2,0,2]
    o = [2,0,2,2,2,0,2,0,1,1,2,2,1,2,1,1,0,0,0,0,1,2,0,1,0,1,0,1,1,0,2,1,0,0,2,1,2,0,0,1,1,0,2,1,2,2,2,0,1,2]
    k = 100
    console.log(maxNumber(i, o ,k).join(''));
    console.log([2,1,0,2,2,2,0,2,0,1,2,0,1,1,2,2,1,2,1,1,0,0,0,2,0,1,0,1,2,0,0,2,1,1,1,2,1,0,0,0,0,2,1,1,1,1,1,1,0,2,2,1,2,0,1,2,2,0,1,2,1,2,0,2,0,2,0,0,0,0,1,2,0,1,0,1,0,1,1,0,2,1,0,0,2,1,2,0,0,1,1,0,2,1,2,2,2,0,1,2].join(''));
}
