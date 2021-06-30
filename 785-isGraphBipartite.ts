namespace IsGraphBipartite785 {

    function isBipartite(graph: number[][]): boolean {
        const
            assignment: (0|1)[] = [],
            pending: Set<number> = new Set(new Array(graph.length).fill(0).map((_, idx) => idx));

        //dfs
        while (pending.size > 0) { // graph can be disconnected
            const
                stack: [number, 0|1][] = [],
                startNode = [...pending][0] as number;

            stack.push([startNode, 0]);

            while (stack.length > 0) {
                const [node, bucket] = stack.pop() as [number, 0|1];

                if (pending.has(node)) {
                    // not visited yet
                    pending.delete(node);

                    if (assignment[node] === undefined) {
                        assignment[node] = bucket;
                    } else if (assignment[node] !== bucket) {
                        // conflict;
                        return false;
                    }

                    const nextBucket = ((bucket + 1) % 2) as 0 | 1;
                    for (const neighbour of graph[node]) {
                        stack.push([neighbour, nextBucket]);
                    }
                }

                if (assignment[node] !== bucket) {
                    return false;
                }
            }
        }

        return true;
    };

}
