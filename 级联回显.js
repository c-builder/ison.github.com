import React from 'react';
import './index.css';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'shanhai',
        label: '上海',
        children: [
          {
            value: 'shanhai1',
            label: '车前',
          },
          {
            value: 'shanhai2',
            label: '车前2',
          },
          {
            value: 'shanhai3',
            label: '车前3',
          },
        ],
      },
      {
        value: '2343',
        label: 'were',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'namjin1',
            label: 'Zhong Hua men',
          },
          {
            value: 'namjin2',
            label: '李华门',
          },
          {
            value: 'namjin3',
            label: '天子门',
          },
        ],
      },
      {
        value: 'q343',
        label: '3434',
      },
    ],
  },
];

const value = [
  ['zhejiang', 'shanhai'],
  ['jiangsu', 'nanjing'],
];

function findPathToValueWithOptions(options, targetValues) {
  // Helper function to recursively search for the target values
  function find(options, path, labels) {
    for (let i = 0; i < options.length; i++) {
      const item = options[i];
      // Construct the current path including the current item
      const currentPath = [...path, item];
      const currentLabels = [...labels, item.label];

      // If current item value matches current target value, and has only one or no children, return the current path and labels
      if (
        item.value === targetValues[path.length] &&
        (!item.children || item.children.length <= 1)
      ) {
        // If we have found all target values, return the path and labels
        if (path.length === targetValues.length - 1) {
          return { path: currentPath, labels: currentLabels };
        }
        // Otherwise continue searching in children
        if (item.children) {
          const result = find(item.children, currentPath, currentLabels);
          if (result) {
            return result; // Return the found path and labels
          }
        }
      }
    }

    // If not found, return null
    return null;
  }

  // Call the helper function starting with an empty path and labels
  return find(options, [], []);
}
const onChange = (value, selectedOptions) => {
  // console.log(value, selectedOptions);
};

const displayRender = (labels, selectedOptions = []) => {
  value.forEach((child) => {
    const result = findPathToValueWithOptions(selectedOptions, child);
    if (result) {
      labels = result.labels;
      selectedOptions = result.path;

      console.log(result, '----result---');
    }
  });

  return labels?.map((label, i) => {
    const option = selectedOptions[i];
    console.log(labels, '----labels');
    console.log(selectedOptions, '---selectedOptions');

    console.log(option, 'optipn');
    console.log('----------', i, ' --------');
    if (i === labels.length - 1) {
      return <span key={option.value}>{label}</span>;
    }
    return <span key={option.value}>{label} / </span>;
  });
};

const onSearch = (value) => {
  console.log(options, '---', value);
};
const App = () => (
  <Cascader
    options={options}
    onChange={onChange}
    placeholder="Please select"
    showSearch
    multiple={true}
    defaultValue={value}
    displayRender={displayRender}
    style={{ width: '100%' }}
    onSearch={onSearch}
    changeOnSelect={false}
  />
);
export default App;
