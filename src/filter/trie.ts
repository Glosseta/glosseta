const ALPHABET_SIZE = 26;

// Trie implementation for storing alphabetical strings
class TrieNode {
    key: any;
    parent: any;
    children = [] as any[];
    isEndOfWord: boolean;

    constructor(key: any) {
        this.key = key
        this.parent = null;
        this.isEndOfWord = false;

        for (let i = 0; i < ALPHABET_SIZE; i++) {
            this.children[i] = null;
        }
    }

    getWord() {
        let output = [];
        let node = this;

        while (node !== null) {
            output.unshift(node.key)
            node = node.parent
        }

        return output.join('');
    }

}

class Trie {

    root: TrieNode;

    constructor() {
        this.root = new TrieNode(null)
    }

    insert = (key: string) => {
        let index;
        let node = this.root;

        for (let level = 0; level < key.length; level++) {
            index = key.charAt(level).charCodeAt(0) - 'a'.charCodeAt(0);

            // If the child is empty, fill it with a node
            if (node.children[index] == null) {
                node.children[index] = new TrieNode(key.charAt(level));
                node.children[index].parent = node;
            }

            // proceed down the trie
            node = node.children[index];
        }

        // once the loop has exited we mark the leaf to signify an end of a word
        node.isEndOfWord = true;
    }

    contains = (key: string) => {
        let index;

        let node = this.root;

        // Walk down the trie to see if a path containing the key can be found
        for (let level = 0; level < key.length; level++) {
            index = key.charAt(level).charCodeAt(0) - 'a'.charCodeAt(0);

            if (node.children[index] == null) {
                return false;
            }

            node = node.children[index];
        }

        return node.isEndOfWord;
    }

    find = (prefix: string) => {
        let node = this.root;
        let words = [] as string[];
        let index;

        for (let i = 0; i < prefix.length; i++) {
            index = prefix.charAt(i).charCodeAt(0) - 'a'.charCodeAt(0);

            if (node.children[index]) {
                node = node.children[index]
            } else {
                return words;
            }
        }

        this.findAllWords(node, words);

        return words;
    }

    // Preform a depth first search to find all words starting from a node
    private findAllWords = (node: TrieNode, words: string[]) => {

        if (node.isEndOfWord) {
            words.unshift(node.getWord())
        }

        for (let child in node.children) {
            if (node.children[child] !== null) {
                this.findAllWords(node.children[child], words)
            }
        }
    }
}


class AutocompleteFilter {

    trie: Trie;

    constructor() {
        this.trie = new Trie();
    }

    getFilter = (filterItems : string[]) => {

        filterItems.forEach((item: string) => {
            this.trie.insert(item.toLowerCase());
        });

        return this.trie;
    }
}


export { AutocompleteFilter, Trie }