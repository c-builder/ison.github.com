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
      {
        value: '222',
        label: "222"
      }
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

function addEmptyNodeIfSingleChild(nodes) {
  nodes.forEach(node => {
    if (node.children && node.children.length === 1) {
      const hasEmptyNode = node.children.some(child => child.value === '');
      if (!hasEmptyNode) {
        node.children.push({ value: '', label: '' });
      }
    }
    if (node.children) {
      addEmptyNodeIfSingleChild(node.children);
    }
  });
}

addEmptyNodeIfSingleChild(options);
console.log(options);
console.log(JSON.stringify(options, null, 2));
