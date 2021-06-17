namespace SerializingBinaryTree297 {

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function serialize(root: TreeNode | null): string {
    if (root === null) {
        return 'null';
    } else {
        return `[${[root.val, serialize(root.left), serialize(root.right)]}]`;
    }
};

function deserialize(data: string): TreeNode | null {
    if (data === 'null') {
        return null;
    } else {
        data = data.substring(1, data.length - 1);

        let
            i = 0,
            firstComma = -1,
            sndComma = -1;

        while (sndComma < 0) {
            switch (data[i]) {
                case '[':
                    let cnt = 0;

                    do {
                        switch (data[i]) {
                            case '[':
                                cnt += 1;
                                break;
                            case ']':
                                cnt -= 1;
                                break;
                        }

                        i += 1;
                    } while (cnt !== 0);
                    i -= 1;

                    break;
                case ',':
                    if (firstComma < 0) {
                        firstComma = i;
                    } else {
                        sndComma = i;
                    }
                    break;
            }

            i += 1;
        }

        return new TreeNode(
            parseInt(data.substring(0, firstComma), 10),
            deserialize(data.substring(firstComma + 1, sndComma)),
            deserialize(data.substring(sndComma + 1))
        );
    }
};

const
    a = new TreeNode(1),
    b = new TreeNode(2),
    c = new TreeNode(3),
    d = new TreeNode(4);

a.left = b;
a.right = c;
b.right = d;

console.log(serialize(a));
console.log(deserialize(serialize(a)));

}
