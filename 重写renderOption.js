// 使用传入的 optionRender，如果没有传入则使用默认的
  const renderOption = (option) => {
    // 先对 option 进行加工处理
    const processedOption = {
      ...option,
      label: option.label.toUpperCase(), // 可以在这里进行其他加工
    };
    
    // 然后调用原本的 optionRender 或默认的 DefaultOptionRender
    return (optionRender || DefaultOptionRender)(processedOption);
  };
