namespace LRU146 {

interface Node {
    prev: Node | null;
    next: Node | null;
    val: number;
    key: number;
}

class LRUCache {

    capacity: number;
    size: number;
    head: Node | null;
    tail: Node | null;
    map: Record<number, Node>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.size = 0;
        this.map = {};
        this.head = null;
        this.tail = null;
    }

    get(key: number): number {
        if (this.map[key] !== undefined) {
            // move to the end
            const existing = this.map[key];

            this.delete(key);
            this.append(existing);

            return existing.val;
        }

        return -1;
    }

    put(key: number, value: number): void {
        const newNode: Node = {
            key: key,
            val: value,
            prev: null,
            next: null
        };

        this.delete(key);
        this.append(newNode);

        if (this.size > this.capacity && this.head !== null) {
            // trim head
            delete this.map[this.head.key];
            this.head = this.head.next;
            this.size -= 1;
        }
    }

    delete(key: number): void {
        if (this.map[key] !== undefined) {
            // delete existing
            const existing = this.map[key];

            if (existing === this.tail) {
                this.tail = existing.prev;
            }
            if (existing === this.head) {
                this.head = existing.next;
            }
            if (existing.prev !== null) {
                existing.prev.next = existing.next;
            }
            if (existing.next !== null) {
                existing.next.prev = existing.prev;
            }

            this.size -= 1;
        }
    }

    append(n: Node): void {
        n.next = null;
        this.size += 1;
        this.map[n.key] = n;

        if (this.tail === null) {
            n.prev = null;
            this.tail = n;
            this.head = n;
        } else {
            n.prev = this.tail;
            this.tail.next = n;
            this.tail = n;
        }
    }

    print() {
        let
            n = this.head,
            s = '';

        while (n !== null) {
            s += `${n.key}:${n.val} `;
            n = n.next;
        }

        console.log(Object.keys(this.map), this.size, s);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

}
