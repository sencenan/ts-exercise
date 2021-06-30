namespace BestTimeToBuyAndSellStock121 {

    function maxProfit(prices: number[]): number {
        const
            minLeftOf: number[] = [prices[0]];

        let
            globalMax = 0;

        for (let i = 1; i < prices.length; i += 1) {
            globalMax = Math.max(globalMax, prices[i] - minLeftOf[i - 1]);
            minLeftOf[i] = Math.min(minLeftOf[i - 1], prices[i]);
        }

        return globalMax;
    };

}
