namespace MinWindowSubSeq727 {

    function minWindow(s1: string, s2: string): string {
        let
            left = 0,
            right = 0,
            s2Ptr = 0,
            min = '',
            minLen = Infinity;

        while (right < s1.length) {
            if (s1[right] === s2[s2Ptr]) {

                if (s2Ptr === 0) {
                    // start of a sub seq
                    left = right;
                }

                if (s2Ptr === s2.length - 1) {
                    // found a sub seq
                    if (minLen > right - left + 1) {
                        minLen = right - left + 1;
                        min = s1.substring(left, right + 1);
                    }

                    // move the left pointer, to find the next start of subseq
                    left += 1;
                    while (left <= right) {
                        if (s1[left] === s2[0]) {
                            right = left - 1;
                            break;
                        }
                        left += 1;
                    }
                }

                s2Ptr = (s2Ptr + 1) % s2.length;
            }

            right += 1;
        }

        return min;
    };

}
