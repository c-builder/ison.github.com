const flatList = [
    { code: 'zhejiang', name: 'Zhejiang', parentCode: null },
    { code: 'hangzhou', name: 'Hangzhou', parentCode: 'zhejiang' },
    { code: 'xihu', name: 'West Lake', parentCode: 'hangzhou' },
    { code: 'xiasha', name: 'Xia Sha', parentCode: 'hangzhou' },
    { code: 'jiangsu', name: 'Jiangsu', parentCode: null },
    { code: 'nanjing', name: 'Nanjing', parentCode: 'jiangsu' },
    { code: 'zhonghuamen', name: 'Zhong Hua men', parentCode: 'nanjing' }
];

function buildTree(flatList) {
    const map = {};
    const tree = [];

    // Create a map of all items
    flatList.forEach(item => {
        map[item.code] = { ...item, children: [] };
    });

    // Build the tree structure
    flatList.forEach(item => {
        if (item.parentCode === null) {
            tree.push(map[item.code]);
        } else {
            if (map[item.parentCode]) {
                map[item.parentCode].children.push(map[item.code]);
            }
        }
    });

    return tree;
}

const tree = buildTree(flatList);
console.log(JSON.stringify(tree, null, 2));
