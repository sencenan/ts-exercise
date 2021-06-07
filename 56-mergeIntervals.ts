namespace MergeIntervals56 {

    function merge(intervals: number[][]): number[][] {
        intervals.sort((a, b) => a[0] - b[0]);

        const
            res: number[][] = [intervals[0]];

        intervals.shift();
        while (intervals.length > 0) {
            const
                tail = res[res.length - 1],
                head = intervals.shift() as number[];

            if (tail[1] >= head[0]) {
                res[res.length - 1] = [
                    Math.min(head[0], tail[0]),
                    Math.max(head[1], tail[1])
                ];
            } else {
                res.push(head);
            }
        }

        return res;
    };

}
