namespace IntersectionTwoArrays349 {

    function intersection(nums1: number[], nums2: number[]): number[] {
        const ns = nums1.reduce((ns, it) => ns.add(it), new Set<number>())
        return [...nums2.filter(it => ns.has(it)).reduce((ns, it) => ns.add(it), new Set<number>())];
    };

}
