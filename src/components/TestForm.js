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
      <Input onChange={()=>{console.log("input")}}></Input>
    </Form.Item>
  )
  return (
    <>
      <Modal
        title={"測試用"}
        visible={true}
      >
        <Form form={form}>
          {inputItem}
        </Form>
      </Modal>
    </>
  );

};

export default TestForm;