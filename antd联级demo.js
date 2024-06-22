import React from 'react';
import './index.css';
import { Cascader } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [],
      },
      {
        value: 'shanhai',
        label: '上海',
        children: [
          {
            value: 'shanhai1',
            label: '车前',
          },
          {
            value: 'shanha2',
            label: '路上',
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
    ],
  },
];

const value = ['zhejiang', 'shanhai'];
const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};

const displayRender = (labels, selectedOptions = []) =>
  labels.map((label, i) => {
    const option = selectedOptions[i];
    if (i === labels.length - 1) {
      return <span key={option.value}>{label}</span>;
    }
    return <span key={option.value}>{label} / </span>;
  });

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
    changeOnSelect={true}
  />
);
export default App;
