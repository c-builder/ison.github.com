const treeArr = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    children: [
      {
        code: '',
        name: 'Hangzhou',
      },
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        children: [
          {
            code: '',
            name: 'Hangzhou',
          },
          {
            code: 'xihu',
            name: 'West Lake',
          },
          {
            code: 'xiasha',
            name: 'Xia Sha',
          },
        ],
      },
    ],
  },
  {
    code: '',
    name: 'Hangzhou',
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    children: [
      {
        code: '',
        name: 'Hangzhou',
      },
      {
        code: 'nanjing',
        name: 'Nanjing',
        children: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

function removeEmptyCodeNodes(arr) {
  return arr.reduce((acc, node) => {
    if (node.code) {
      const newNode = { ...node };
      if (newNode.children) {
        newNode.children = removeEmptyCodeNodes(newNode.children);
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
}

const cleanedTreeArr = removeEmptyCodeNodes(treeArr);
console.log(JSON.stringify(cleanedTreeArr, null, 2));
