namespace CloneGraph133 {

class Node {
    val: number
    neighbors: Node[]
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val===undefined ? 0 : val)
        this.neighbors = (neighbors===undefined ? [] : neighbors)
    }
}

 function cloneGraph(node: Node | null): Node | null {
	if (node == null) {
        return null;
    }

    const
        adj: Record<string, Set<number>> = {},
        nodes: Record<string, Node> = {};

    let
        head: Node | null = null,
        pending: Node[] = [node];

    while (pending.length > 0) {
        const cur = pending.shift() as Node;

        if (nodes[cur.val] === undefined) {
            nodes[cur.val] = new Node(cur.val);
            adj[cur.val] = new Set();
        }

        if (head == null) {
            head = nodes[cur.val];
        }

        for (const next of cur.neighbors) {
            adj[cur.val].add(next.val);

            if (nodes[next.val] === undefined) {
                pending.push(next);
            }
        }
    }

    Object.keys(adj).forEach(
        val => {
            for (const neighbor of adj[val]) {
                nodes[val].neighbors.push(nodes[neighbor]);
            }
        }
    );

    return head;
};

}
