import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Cascader, Radio } from 'antd';

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

const MyForm = () => {
  const [form] = Form.useForm();
  const [customError, setCustomError] = useState('');

  useEffect(() => {
    // 动态设置初始值
    form.setFieldsValue({
      visibility: 'private',
      username: '',
      location: undefined,
    });
  }, [form]);

  const onFinish = (values) => {
    console.log('Form values:', values);
    setCustomError('');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateVisibility = async (_, value) => {
    if (value === 'private') {
      const username = form.getFieldValue('username');
      const location = form.getFieldValue('location');
      if (!username && !location) {
        setCustomError('用户名和地点在选择"仅lab可见"时为必填项');
        form.scrollToField('visibility');
        return Promise.reject();
      }
    }
    setCustomError('');
    return Promise.resolve();
  };

  const triggerVisibilityValidation = () => {
    form.validateFields(['visibility']);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: false, message: '用户名不能为空' }]}
      >
        <Input onChange={triggerVisibilityValidation} />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: false, message: '地点不能为空' }]}
      >
        <Cascader options={options} onChange={triggerVisibilityValidation} />
      </Form.Item>
      <Form.Item
        name="visibility"
        label="Visibility"
        rules={[
          { required: true, message: '请选择可见性!' },
          { validator: validateVisibility }
        ]}
      >
        <Radio.Group>
          <Radio value="public">公开</Radio>
          <Radio value="private">仅lab可见</Radio>
        </Radio.Group>
      </Form.Item>
      {customError && (
        <div style={{ color: 'red', marginBottom: '16px' }}>
          {customError}
        </div>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
