// https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/

namespace countPairs {

  const pairs = (n: number) => n * (n - 1) / 2;

  function countPairs(n: number, edges: number[][]): number {
    const adjTable = edges.reduce(
      (adj, [a, b]) => {
        if (!adj[a]) {
          adj[a] = [];
        }
        if (!adj[b]) {
          adj[b] = [];
        }

        adj[a].push(b);
        adj[b].push(a);

        return adj;
      },
      {} as Record<number, number[]>
    );

    const groups: number[] = [];
    const visited: Set<number> = new Set();

    const visit = (cur: number, connected: Set<number>): void => {
      visited.add(cur);
      connected.add(cur);

      if (adjTable[cur]) {
        adjTable[cur]
          .filter(n => !connected.has(n))
          .forEach(n => visit(n, connected));
      }
    };

    for (let i = 0; i < n; i+= 1) {
      if (!visited.has(i)) {
        // starting a new group
        const connected: Set<number> = new Set();

        visit(i, connected);

        groups.push(connected.size);
      }
    }

    return pairs(n) - groups.reduce((sum, x) => sum + pairs(x), 0);
  }

}
