function buildAndMergeHierarchies(arrays, defaultArr) {
  var map = {};
  var allNodes = [];

  arrays = flattenArrays(arrays);
  processNodes(arrays, map, allNodes);
  addDefaultNodes(defaultArr, map, allNodes);
  var rootNodes = determineRootNodes(map);

  return rootNodes;
}

function flattenArrays(arrays) {
  return Array.prototype.concat.apply([], arrays);
}

function processNodes(nodes, map, allNodes) {
  nodes.forEach(function (node) {
    if (!map[node.code]) {
      map[node.code] = createNode(node);
    }
    var currentNode = map[node.code];
    currentNode.name = node.name; // Ensure name is updated if node is revisited
    allNodes.push(node.code);

    if (node.childCode) {
      if (!map[node.childCode]) {
        map[node.childCode] = createNode({
          code: node.childCode,
          name: "",
        });
      }
      var childNode = map[node.childCode];
      currentNode.children.push(childNode);
      currentNode.isLeaf = false;
    }
  });
}

function createNode(node) {
  return {
    code: node.code,
    name: node.name,
    children: [],
    isLeaf: true,
  };
}

function addDefaultNodes(defaultArr, map, allNodes) {
  defaultArr.forEach(function (node) {
    if (!map[node.code]) {
      map[node.code] = createNode(node);
    }
    allNodes.push(node.code);
  });
}

function determineRootNodes(map) {
  var rootNodes = [];
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      var node = map[key];
      var isChild = false;
      for (var otherKey in map) {
        if (map.hasOwnProperty(otherKey)) {
          var otherNode = map[otherKey];
          if (otherNode.children.indexOf(node) !== -1) {
            isChild = true;
            break;
          }
        }
      }
      if (!isChild) {
        rootNodes.push(node);
      }
    }
  }
  return rootNodes;
}

var result = buildAndMergeHierarchies(arr, defaultArr);
console.log(result);
