namespace MaxPointsOnALine149 {

function maxPoints(points: number[][]): number {
    const counter: Record<string, number> = {};

    // sort by x
    points.sort((a, b) => a[0] - b[0]);

    if (points.length === 2) {
        return 2;
    }

    let max = 0;

    // seed points
    for (let i = 1; i < points.length; i += 1) {
        const segs: Record<string, number> = {};

        for (let j = i - 1; j >= 0; j -= 1) {
            const
                x1 = points[j][0],
                y1 = points[j][1],
                x2 = points[i][0],
                y2 = points[i][1],
                g = gcd(y2 - y1, x2 - x1),
                m = [(y2 - y1) / g, (x2 - x1) / g],
                b = ((x2 - x1) * y2 - (y2 - y1) * x2) / g,
                key = (x2 === x1) ? `${x1}` : `${m},${b}`;

            segs[key] = 1;
        }

        Object.keys(segs).forEach(key => {
            if (counter[key] === undefined) {
                counter[key] = 0;
            }
            counter[key] += 1;

            if (counter[key] > max) {
                max = counter[key];
            }
        });
    }

    //console.log(counter);
    return max + 1;
};

const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

}
