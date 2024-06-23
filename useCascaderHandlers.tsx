import React from "react";

interface Option {
  value: string | number; // 根据实际情况定义类型
  label: string;
  children?: Option[];
}

const useCascaderHandlers = () => {
  const onChange = (value: any, selectedOptions: Option[] | undefined) => {
    console.log(value, selectedOptions);
  };

  const displayRender = (
    labels: React.ReactNode[],
    selectedOptions?: Option[]
  ) =>
    labels.map((label, i) => {
      const option = selectedOptions && selectedOptions[i];
      if (option) {
        if (i === labels.length - 1) {
          return <span key={option.value.toString()}>{label}</span>;
        }
        return <span key={option.value.toString()}>{label} / </span>;
      }
      return null;
    });

  return {
    onChange,
    displayRender,
  };
};

export default useCascaderHandlers;
