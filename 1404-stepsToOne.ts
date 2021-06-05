namespace StepsToReduceToBinaryOne1404 {

function numSteps(s: string): number {
    let
        cnt = 0,
        cur = s.length - 1;

    while (cur > 0) {
        if (s[cur] === '0') {
            // find 1st one to left of curr
            const k = s.lastIndexOf('1', cur);

            if (k === -1) {
                return cnt + 1;
            } else {
                cnt += cur - k;
                cur = k;
            }
        } else {
            // is at '1', find 1st one to left of curr
            const k = s.lastIndexOf('0', cur);

            if (k === -1) {
                // the number is all ones
                return cnt + cur + 2;
            } else {
                cnt += 1 + (cur - k);
                cur = k;
                s = s.substring(0, cur) + '1';
            }
        }
    }

    return cnt;
};

}
