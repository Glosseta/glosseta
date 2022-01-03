import Trie from "../../src/filter/trie";

describe("Trie insertion", () => {
  it("inserts items into the trie", () => {
    // Prepare
    let trie = new Trie();

    // Execute
    trie.insert("eip");
    trie.insert("ethereum");
    trie.insert("eth");
    trie.insert("arweave");

    // Verify
    expect(trie.contains("eip")).toBeTruthy();
    expect(trie.contains("ethereum")).toBeTruthy();
    expect(trie.contains("eth")).toBeTruthy();
    expect(trie.contains("arweave")).toBeTruthy();
    expect(trie.contains("bitcoin")).toBeFalsy();
  });
});

describe("Trie word retrieval", () => {
  it("retrieves words beginning with e", () => {
    // Prepare
    let output = [];
    let trie = new Trie();
    trie.insert("eip");
    trie.insert("ethereum");
    trie.insert("eth");
    trie.insert("arweave");

    // Execute
    output = trie.find("e");

    // Verify
    expect(output.length).toBe(3);
    expect(output.find((element) => element === "eip")).toBe("eip");
    expect(output.find((element) => element === "ethereum")).toBe("ethereum");
    expect(output.find((element) => element === "eth")).toBe("eth");
    expect(output.find((element) => element === "arweave")).toBeFalsy();
  });

  it("retrieves exact word", () => {
    // Prepare
    let output = [];
    let trie = new Trie();
    trie.insert("eip");
    trie.insert("ethereum");
    trie.insert("eth");
    trie.insert("arweave");

    // Execute
    output = trie.find("arweave");

    // Verify
    expect(output.length).toBe(1);
    expect(output.find((element) => element === "arweave")).toBe("arweave");
  });

  it("Does not find word when trie populated", () => {
    // Prepare
    let output = [];
    let trie = new Trie();
    trie.insert("eip");
    trie.insert("ethereum");
    trie.insert("eth");
    trie.insert("arweave");

    // Execute
    output = trie.find("bitcoin");

    // Verify
    expect(output.length).toBe(0);
    expect(output.find((element) => element === "bitcoin")).toBeFalsy();
  });

  it("Does not find word when trie empty", () => {
    // Prepare
    let output = [];
    let trie = new Trie();
    
    // Execute
    output = trie.find("bitcoin");

    // Verify
    expect(output.length).toBe(0);
    expect(output.find((element) => element === "bitcoin")).toBeFalsy();
  });
});
