namespace NonCrossingHandshakes1259 {

    const MAX = BigInt(Math.pow(10, 9) + 7);

    function numberOfWays(num_people: number): number {
        const
            memo: Record<number, bigint> = {},
            catalan = (n: number): bigint => {
                if (memo[n] !== undefined) {
                    return memo[n];
                }

                if (n <= 1) {
                    return memo[n] = 1n;
                }

                let r = 0n;
                for (let i = 0; i < n; i += 1) {
                    r = r + catalan(i) * catalan(n - 1 - i);
                }

                return memo[n] = r;
            };

        return Number(catalan(num_people / 2) % MAX);
    };

}
