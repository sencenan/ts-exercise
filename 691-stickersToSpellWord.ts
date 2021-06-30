namespace StickersToSpellWord691 {

    function minStickers(stickers: string[], target: string): number {
        let minCost = Infinity;

        const
            stickerLists = stickers.map(s => Array.from(s).sort()),
            memo: Record<string, number> = {},
            solver = (cs: string): number => {
                if (cs.length === 0) {
                    return 0;
                }

                if (memo[cs] !== undefined) {
                    return memo[cs];
                }

                let min = Infinity;

                for (let i = 0; i < stickerLists.length; i += 1) {
                    // remove first occurrence
                    let
                        stickerList = stickerLists[i],
                        remaining: string = '',
                        ri = 0,
                        si = 0;

                    while (ri < cs.length && si < stickerList.length) {
                        if (cs[ri] === stickerList[si]) {
                            ri += 1;
                            si += 1;
                        } else if (cs[ri] < stickerList[si]) {
                            remaining += cs[ri];
                            ri += 1;
                        } else {
                            si += 1;
                        }
                    }
                    remaining = remaining.concat(cs.slice(ri));

                    if (remaining.length < cs.length) {
                        min = Math.min(min, 1 + solver(remaining));
                    }
                }

                return memo[cs] = min;
            };

        const t = Array.from(target).sort().join('');
        solver(t);
        return isFinite(memo[t]) ? memo[t] : -1;
    };

}
