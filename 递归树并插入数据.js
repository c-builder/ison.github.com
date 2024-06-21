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
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
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
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const itemList = [
  {
    value: "子南",
    label: "子南label",
    parentValue: "nanjing",
  },
  {
    value: "深圳",
    label: "深圳市",
    parentValue: 0,
  },
  {
    value: "好世界",
    label: "好世界label",
    parentValue: 0,
  },
  {
    value: "广东",
    label: "广东省",
    parentValue: "jiangsu",
  },
];

const insertItemIntoOptions = (options, item) => {
  if (item.parentValue === 0) {
    // 插入到根节点
    if (!options.find(option => option.value === item.value)) {
      options.push({ ...item, children: [] });
    }
  } else {
    // 插入到指定父节点
    const insertIntoParent = (nodes) => {
      for (let node of nodes) {
        if (node.value === item.parentValue) {
          if (!node.children) {
            node.children = [];
          }
          if (!node.children.find(child => child.value === item.value)) {
            node.children.push({ ...item, children: [] });
          }
          return true;
        }
        if (node.children && node.children.length > 0) {
          if (insertIntoParent(node.children)) {
            return true;
          }
        }
      }
      return false;
    };

    insertIntoParent(options);
  }
};

// 遍历itemList并插入到options
itemList.forEach(item => insertItemIntoOptions(options, item));
console.log(options);
console.log(JSON.stringify(options, null, 2));
