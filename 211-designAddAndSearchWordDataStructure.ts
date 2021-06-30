namespace DesignAddAndSearchWordDataStructure211 {

    interface Node {
        isWord: boolean;
        children: Record<string, Node>;
    }

    const addChildren = (node: Node, str: string) => {
        if (str.length === 0) {
            return;
        }

        if (node.children[str[0]] === undefined) {
            node.children[str[0]] = {
                isWord: false,
                children: {}
            };
        }

        if (str.length === 1) {
            node.children[str[0]].isWord = true;
        }

        addChildren(node.children[str[0]], str.substring(1));
    };

    const searchNode = (node: Node, str: string): boolean => {
        if (node.isWord && str.length === 0) {
            return true;
        }

        if (node.children[str[0]] !== undefined) {
            return searchNode(node.children[str[0]], str.substring(1));
        }

        if (str[0] === '.') {
            // search all the child
            for (const child of Object.values(node.children)) {
                if (searchNode(child, str.substring(1))) {
                    return true;
                }
            }
        }

        return false;
    };

    class WordDictionary {
        dict: Node = { isWord: false, children: {} };

        constructor() {
        }

        addWord(word: string): void {
            addChildren(this.dict, word);
            // console.log(JSON.stringify(this.dict));
        }

        search(word: string): boolean {
            return searchNode(this.dict, word);
        }
    }

    /**
     * Your WordDictionary object will be instantiated and called as such:
     * var obj = new WordDictionary()
     * obj.addWord(word)
     * var param_2 = obj.search(word)
     */

}
