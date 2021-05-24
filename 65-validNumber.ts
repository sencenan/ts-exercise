namespace ValidNumber65 {

    function isNumber(s: string): boolean {
        const
            INT_PAT = /^[+\-]?\d+$/g,
            PAT = /^([+\-]?\d+)$|^[+\-]?(\d+\.\d+|\d+\.|\.\d+)$/g;

        s = s.toLowerCase();

        const eCnt = (s.match(/[e]/g) || []).length;

        if (eCnt > 1) {
            return false;
        } else if (eCnt === 1) {
            const [ prefix, eComp ] = s.split('e');

            return PAT.test(prefix) && INT_PAT.test(eComp);
        } else {
            return PAT.test(s);
        }
    };

}
