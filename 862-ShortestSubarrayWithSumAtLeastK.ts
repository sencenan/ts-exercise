namespace ShortestSubarrayWithSumAtLeastK862 {

// function shortestSubarray(nums: number[], k: number): number {
//     let
//         minLen = -1,
//         sums: [number, number][] = []; //value, length

//     for (let i = 0; i < nums.length; i += 1) {
//         if (nums[i] >= k) {
//             return 1;
//         }

//         sums = sums
//             .filter(([v, l]) => {
//                 if (v + nums[i] >= k) {
//                     if (minLen < 0 || minLen > l + 1) {
//                         minLen = l + 1;
//                     }

//                     return false;
//                 } else {
//                     return true;
//                 }
//             })
//             .map(([v, l]) => [v + nums[i], l + 1]);

//         sums.push([nums[i], 1]);
//     }

//     return minLen;
// };

function shortestSubarray(nums: number[], k: number): number {
    let
        minLen = Infinity,
        prefixes: number[] = [0],
        candidates: number[] = [];

    nums.forEach(x => prefixes.push(prefixes[prefixes.length - 1] + x));

    for (let i = 0; i < prefixes.length; i += 1) {
        const py = prefixes[i];

        while (candidates.length > 0 && py <= prefixes[candidates[candidates.length - 1]]) {
            // candidates must have an increase prefix sum
            candidates.pop();
        }

        while (candidates.length > 0 && py >= prefixes[candidates[0]] + k) {
            minLen = Math.min(minLen, i - (candidates.shift() as number));
        }

        candidates.push(i);
    }

    return isFinite(minLen) ? minLen : -1;
}

}
