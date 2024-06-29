const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function addEmptyNodeAndSearchMode(nodes) {
  nodes.forEach(node => {
    // Check and add isSearchMode property if it doesn't exist
    if (!node.hasOwnProperty('isSearchMode')) {
      node.isSearchMode = node.value;
    }

    // Check if the children array exists and has only one non-empty child
    if (node.children && node.children.length === 1) {
      const hasEmptyNode = node.children.some(child => child.value === '');
      if (!hasEmptyNode) {
        node.children.push({ value: '', label: '' });
      }
    }

    // Recursively process children nodes
    if (node.children) {
      addEmptyNodeAndSearchMode(node.children);
    }
  });
}

addEmptyNodeAndSearchMode(options);
console.log(JSON.stringify(options, null, 2));
