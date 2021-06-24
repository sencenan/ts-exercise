namespace LongestValidParentheses32 {

    function longestValidParentheses(s: string): number {
        let
            maxLen = 0,
            left = 0,
            right = 0,
            factor = 0;

        while (right < s.length) {
            if (s[right] === '(') {
                factor += 1;
            } else {
                if (factor === 0) {
                    // must be invalid
                    maxLen = Math.max(maxLen, right - left);
                    right = left = right + 1;
                    factor = 0;
                    continue;
                } else {
                    factor -= 1;

                    if (factor === 0) {
                         maxLen = Math.max(maxLen, right - left + 1);
                    }
                }
            }

            if (right === s.length - 1 && factor === 0) {
                maxLen = Math.max(maxLen, right - left + 1);
            }

            right += 1;
        }

        left = right = s.length - 1;
        factor = 0;

        while (left >= 0) {
            if (s[left] === ')') {
                factor += 1;
            } else {
                if (factor === 0) {
                    maxLen = Math.max(maxLen, right - left);
                    right = left = left - 1;
                    factor = 0;
                    continue;
                } else {
                    factor -= 1;

                    if (factor === 0) {
                         maxLen = Math.max(maxLen, right - left + 1);
                    }
                }
            }

            if (left === 0 && factor === 0) {
                maxLen = Math.max(maxLen, right - left + 1);
            }

            left -= 1;
        }

        return maxLen;
    };


}
