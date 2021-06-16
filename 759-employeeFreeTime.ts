namespace EmployeeFreeTime759 {

 class Interval {
    start: number;
    end: number;
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
 }

 function employeeFreeTime(schedule: Interval[][]): Interval[] {
    const overlap = (a: Interval, b: Interval): Interval | null => {
        const
            start = Math.max(a.start, b.start),
            end = Math.min(a.end, b.end);

        if (start < end) {
            return new Interval(start, end);
        } else {
            return null;
        }
    };

    let common: Interval[] = [new Interval(-Infinity, Infinity)];

    schedule.map(intervals => {
        const freeIntervals: Interval[] = [new Interval(-Infinity, intervals[0].start)];

        for (let i = 1; i < intervals.length; i += 1) {
            const
                lhs = intervals[i - 1],
                rhs = intervals[i];

            freeIntervals.push(new Interval(lhs.end, rhs.start));
        }

        freeIntervals.push(new Interval(intervals[intervals.length - 1].end, Infinity));

        // intersect
        common = freeIntervals.reduce(
            (res, interval) => res.concat(
                common
                    .map(existing => overlap(interval, existing))
                    .filter((x): x is Interval => x !== null)
            ),
            [] as Interval[]
        );
    });

    return common.slice(1, common.length - 1);
};

}
