import React from "react";
import { Cascader, Switch } from "antd";
import useCascaderHandlers from "./useCascaderHandlers";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

interface Props {
  options: Option[];
  defaultValue: (string | number)[][];
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  initResData: any; // 根据实际数据结构定义类型
  loading: boolean;
  error: string | null;
}

function CascaderComponent({
  options,
  defaultValue,
  isEditMode,
  setIsEditMode,
  initResData,
  loading,
  error,
}: Props) {
  const { onChange, displayRender } = useCascaderHandlers();

  const onSearch = (value: string) => {
    console.log(options, "---", value);
  };

  if (loading) {
    return <div>正在请求...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checked={isEditMode}
          onChange={() => setIsEditMode(!isEditMode)}
          checkedChildren="编辑模式"
          unCheckedChildren="浏览模式"
        />
      </div>
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
        showSearch
        multiple
        defaultValue={defaultValue}
        displayRender={displayRender}
        style={{ width: "100%" }}
        onSearch={onSearch}
        changeOnSelect
      />
      <div>
        <h2>Initial Response Data:</h2>
        <pre>{JSON.stringify(initResData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default CascaderComponent;
