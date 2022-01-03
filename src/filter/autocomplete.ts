import Trie from "./trie";

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

export default AutocompleteFilter;