import React, { useState } from "react";
import ReactDOM from "react-dom";
import CascaderComponent from "./CascaderComponent";
import useCascaderOptions from "./useCascaderOptions";
import useInitResData from "./useInitResData";

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { options, defaultValue } = useCascaderOptions(isEditMode);
  const { initResData, loading, error } = useInitResData();

  if (loading) {
    return <div>正在请求...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Application</h1>
      <CascaderComponent
        options={options}
        defaultValue={defaultValue}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        initResData={initResData}
        loading={loading}
        error={error}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
