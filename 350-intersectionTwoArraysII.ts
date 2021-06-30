namespace IntersectionTwoArraysII350 {

    function intersect(nums1: number[], nums2: number[]): number[] {
        const
            map: Record<number, number> = nums1
                .reduce((ns, it) => {
                    if (ns[it] === undefined) {
                        ns[it] = 0;
                    }
                    ns[it] += 1;

                    return ns;
                }, {} as Record<number, number>),
            intersect: number[] = [];

        nums2.forEach(it => {
            if (map[it] > 0) {
                intersect.push(it);
                map[it] -= 1;
            }
        });

        return intersect;
    };

}
