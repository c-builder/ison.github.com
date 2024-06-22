const tree = [
  {
    "code": "zhejiang",
    "name": "Zhejiang",
    "parentCode": null,
    "children": [
      {
        "code": "hangzhou",
        "name": "Hangzhou",
        "parentCode": "zhejiang",
        "children": [
          {
            "code": "xihu",
            "name": "West Lake",
            "parentCode": "hangzhou",
            "children": []
          },
          {
            "code": "xiasha",
            "name": "Xia Sha 7878",
            "parentCode": "hangzhou",
            "children": [{
              "code": '234343',
              name: 'wwww'
            }]
          }
        ]
      }
    ]
  },
  {
    "code": "jiangsu",
    "name": "Jiangsu",
    "parentCode": null,
    "children": [
      {
        "code": "nanjing",
        "name": "Nanjing",
        "parentCode": "jiangsu",
        "children": [
          {
            "code": "zhonghuamen",
            "name": "Zhong Hua men",
            "parentCode": "nanjing",
            "children": []
          }
        ]
      }
    ]
  }
];

const newChildren = [
  { code: 'code1', name: 'code1', parentCode: 'hangzhou' },
  { code: 'code2', name: 'code2', parentCode: 'hangzhou' },
  { code: 'code3', name: 'code3', parentCode: 'hangzhou' },
  { code: 'code4', name: 'code4', parentCode: 'hangzhou' },
  { code: 'xiasha', name: 'Xia Sha Updated', parentCode: 'hangzhou' },
  { code: 'newchild', name: 'New Child', parentCode: 'hangzhou' },
  { code: 'xihu', name: 'West Lake Updated', parentCode: 'hangzhou' }
];

function updateTreeWithNewChildren(tree, newChildren) {
  const parentCodeMap = {};

  // Create a map for parent codes
  newChildren.forEach(child => {
    if (!parentCodeMap[child.parentCode]) {
      parentCodeMap[child.parentCode] = [];
    }
    parentCodeMap[child.parentCode].push(child);
  });

  // Recursively update the tree
  function updateNode(node) {
    if (parentCodeMap[node.code]) {
      const childrenMap = {};

      // Create a map of existing children
      if (node.children) {
        node.children.forEach(child => {
          childrenMap[child.code] = child;
        });

        // Clear current children and add/update based on newChildren
        node.children = parentCodeMap[node.code].map(newChild => {
          if (childrenMap[newChild.code]) {
            // If the child already exists, use the original child data
            return childrenMap[newChild.code];
          } else {
            // Otherwise, add the new child as it is
            return { ...newChild, children: [] };
          }
        });
      }
    }

    // Recursively update children nodes
    if (node.children) {
      node.children.forEach(child => {
        updateNode(child);
      });
    }
  }

  tree.forEach(root => {
    updateNode(root);
  });
}

updateTreeWithNewChildren(tree, newChildren);

console.log(tree);

console.log(JSON.stringify(tree, null, 2));
