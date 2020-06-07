import React from 'react';
import { Modal, Button, Form, Switch, Radio, Rate, Checkbox, Input } from 'antd';

const TestForm = (props) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      test: 'fasdfafaf',
    });
  }, []);

  const inputItem = (
    <Form.Item
      label="test"
      name="test"
      rules={[{ required: true, message: '請輸入餐廳名稱!' }]}
    >
      <Input ></Input>
    </Form.Item>
  )

  const handleSave = (values) => {
    console.log(values)
    props.onFinish(5);
  };

  const footer = [
    <Button type="primary" onClick={handleSave} form="testform" key="submit" htmlType="submit">
      儲存
    </Button>,
    <Button key="cancel" onClick={props.onCancel}>
      取消
    </Button>
  ];

  return (
    <>
      <Modal
        title={"測試用"}
        visible={props.visible}
        onCancel={props.onCancel}
        footer={footer}
        forceRender
      >
        <Form form={form} id="testform">
          {inputItem}
        </Form>
      </Modal>
    </>
  );

};

export default TestForm;