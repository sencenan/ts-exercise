namespace WordSearchII212 {

    function findWords(board: string[][], words: string[]): string[] {
        const
            rows = board.length,
            cols = board[0].length,
            found: Set<string> = new Set(),
            dict: Record<string, string> = {};

        let maxLen = 0;

        words.forEach(w => {
            if (w.length > maxLen) {
                maxLen = w.length;
            }

            dict[w] = w;
        });

        const dfs = (r: number, c: number, path: string = '', visited: Set<string> = new Set()) => {
            const
                char = board[r][c],
                pos = `${r},${c}`;

            if (visited.has(pos)) {
                return;
            }
            visited.add(pos);
            path += char;

            if (dict[path] !== undefined) {
                found.add(dict[path]);
            }

            if (path.length < maxLen) {
                if (r - 1 >= 0) {
                    dfs(r - 1, c, path, visited);
                }

                if (r + 1 < rows) {
                    dfs(r + 1, c, path, visited);
                }

                if (c - 1 >= 0) {
                    dfs(r, c - 1, path, visited);
                }

                if (c + 1 < cols) {
                    dfs(r, c + 1, path, visited);
                }
            }

            visited.delete(pos);
        };

        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                dfs(r, c);
            }
        }

        return [...found];
    };

}
