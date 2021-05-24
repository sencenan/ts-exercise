namespace RainWater {

    interface LocalMax {
        left: number;
        right: number;
        height: number;
    }

    function trap(height: number[]): number {
        const locals: LocalMax[] = height.map(h => ({
            left: -1,
            right: -1,
            height: h
        }));

        // left to right
        for (let i = 1; i < height.length; i += 1) {
            locals[i].left = Math.max(locals[i - 1].left, height[i - 1]);
        }

        // right to left
        for (let i = height.length - 2; i >= 0; i -= 1) {
            locals[i].right = Math.max(locals[i + 1].right, height[i + 1]);
        }

        return locals
            .filter(({left, right, height}) => left > height && right > height)
            .map(({left, right, height}) => Math.min(left, right) - height)
            .reduce((volume, height) => volume + height, 0);
    };

    console.log(trap([]));
    console.log(trap([0,1,0,2,1,0]));
    console.log(trap([4,2,0,3,2,5]))

}
