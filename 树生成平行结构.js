const nestedStructure = [
    {
        "code": "zhejiang",
        "name": "Zhejiang",
        "children": [
            {
                "code": "hangzhou",
                "name": "Hangzhou",
                "children": [
                    {
                        "code": "xihu",
                        "name": "West Lake"
                    },
                    {
                        "code": "xiasha",
                        "name": "Xia Sha"
                    }
                ]
            }
        ]
    },
    {
        "code": "jiangsu",
        "name": "Jiangsu",
        "children": [
            {
                "code": "nanjing",
                "name": "Nanjing",
                "children": [
                    {
                        "code": "zhonghuamen",
                        "name": "Zhong Hua men"
                    }
                ]
            }
        ]
    }
];

function flattenStructure(structure) {
    const flatList = [];
    
    function _flatten(item, parentCode = null) {
        const { code, name } = item;
        flatList.push({ code, name, parentCode });
        
        if (item.children) {
            item.children.forEach(child => _flatten(child, code));
        }
    }
    
    structure.forEach(entry => _flatten(entry));
    return flatList;
}

const flatList = flattenStructure(nestedStructure);
console.log(flatList);
