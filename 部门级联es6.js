function buildAndMergeHierarchies(arrays, defaultArr) {
  const map = new Map();
  const allNodes = new Set();

  arrays.flat().forEach((node) => {
    if (!map.has(node.code)) {
      map.set(node.code, { ...node, children: [] });
    }
    const currentNode = map.get(node.code);
    currentNode.name = node.name; // Ensure name is updated if node is revisited
    allNodes.add(node.code);

    if (node.childCode) {
      if (!map.has(node.childCode)) {
        map.set(node.childCode, { code: node.childCode, children: [] });
      }
      const childNode = map.get(node.childCode);
      currentNode.children.push(childNode);
    }
  });

  // Adding defaultArr items to the map
  defaultArr.forEach((node) => {
    if (!map.has(node.code)) {
      map.set(node.code, { ...node, children: [] });
    }
    allNodes.add(node.code);
  });

  // Determine the root nodes
  const rootNodes = Array.from(map.values()).filter(
    (node) =>
      !Array.from(map.values()).some((parent) => parent.children.includes(node))
  );

  return rootNodes;
}

const result = buildAndMergeHierarchies(arr, defaultArr);
console.log(JSON.stringify(result, null, 2));
