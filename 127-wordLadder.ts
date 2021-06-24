namespace WordLadder127 {

    function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
        const
            adjList: Record<string, Set<string>> = {
                [beginWord]: new Set()
            },
            diff = (a: string, b: string): number => {
                let diff = Math.abs(a.length - b.length);

                for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
                    if (a[i] !== b[i]) {
                        diff += 1;
                    }
                }

                return diff;
            };

        for (let i = 0; i < wordList.length; i += 1) {
            if (adjList[wordList[i]] === undefined) {
                adjList[wordList[i]] = new Set();
            }

            for (let j = i + 1; j < wordList.length; j += 1) {
                if (diff(wordList[i], wordList[j]) === 1) {
                    // a pair of neighbour
                    if (adjList[wordList[j]] === undefined) {
                        adjList[wordList[j]] = new Set();
                    }
                    adjList[wordList[i]].add(wordList[j]);
                    adjList[wordList[j]].add(wordList[i]);
                }
            }

            if (diff(beginWord, wordList[i]) === 1) {
                adjList[beginWord].add(wordList[i]);
                adjList[wordList[i]].add(beginWord);
            }
        }

        if (adjList[endWord]?.size === 0) {
            return 0;
        }

        if (adjList[beginWord].size === 0) {
            return 0;
        }

        // bfs
        let
            pending = [beginWord],
            depth = 1,
            visited: Set<string> = new Set(),
            next: string[] = [];


        while (pending.length > 0) {
            const node = pending.shift() as string;

            if (!visited.has(node)) {
                visited.add(node);

                for (const neighbour of adjList[node]) {
                    if (neighbour === endWord) {
                        // found
                        return depth + 1;
                    }

                    next.push(neighbour);
                }
            }

            if (pending.length === 0) {
                pending = next;
                next = [];
                depth += 1;
            }
        }

        return 0;
    };

}
