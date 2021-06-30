namespace TaskScheduler621 {

    function leastInterval(tasks: string[], n: number): number {
        const
            freqMap = tasks.reduce(
                (fq, it) => {
                    if (fq[it] === undefined) {
                        fq[it] = 0;
                    }
                    fq[it] += 1;
                    return fq;
                },
                {} as Record<string, number>
            ),
            freqList: number[] = Object.keys(freqMap).map(x => freqMap[x]).sort((a, b) => b - a);

        let idles = (freqList[0] - 1) * n;

        for (let i = 1; i < freqList.length; i += 1) {
            idles = Math.max(0, idles - Math.min(freqList[0] - 1, freqList[i]));
        }

        return tasks.length + idles;
    };

}
