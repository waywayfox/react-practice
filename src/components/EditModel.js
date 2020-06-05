import React from 'react';
import { Modal, Button, Form, Switch, Radio, Rate, Checkbox, Input } from 'antd';

const { TextArea } = Input;


export const EditModel = (props) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    // console.log(props.index)
    form.setFieldsValue({
      name: props.restaurant.name,
    });
  }, []);

  const testFinish = (values) => {
    console.log(values)
  }

  const generateModelFooter = () => {
    const footer = [
      <Button key="save" type="primary" onClick={testFinish} form="RestaurantForm" key="submit" htmlType="submit">
        儲存
      </Button>,
      <Button key="cancel" onClick={props.onCancel}>
        取消
      </Button>
    ];

    if (!props.isAdd) {
      footer.unshift(
        <Button key="remove" type="danger" onClick={props.removeRestaurant} >
          炸毀
        </Button>
      );
    }
    return footer;
  }

  const nameFormItem = (
    <Form.Item
      label="name"
      name="name"
      rules={[{ required: true, message: '請輸入餐廳名稱!' }]}
    >
      <Input onChange={()=>{console.log("input")}}></Input>
    </Form.Item>
  );

  const descriptionFormItem = (
    <Form.Item
      label="description"
      name="description"
      rules={[{ required: true, message: '說一下你在做啥!' }]}
    >
      <TextArea></TextArea>
    </Form.Item>
  );

  const ratingFormItem = (
    <Form.Item
      label="rating"
      name="rating"
      rules={[{ required: true, message: '一顆星50000。' }]}
    >
      <Rate allowHalf ßß></Rate>
    </Form.Item>
  );

  const isOnSaleFormItem = (
    <Form.Item
      label="isOnsale"
      name="isOnsale"
      rules={[{ required: true, message: '夏日特賣不打折？' }]}
    >
      <Switch checked/>
    </Form.Item>
  );

  const serveOptions = [
    { label: '牛肉', value: 'beef' },
    { label: '豬肉', value: 'pork' },
    { label: '雞肉', value: 'chicken' },
    { label: '海鮮', value: 'seafood' },
    { label: '素食', value: 'Vegetarian' }
  ];
  const serveListFormItem = (
    <Form.Item
      label="serveList"
      name="serveList"
      rules={[{ required: true, message: '你在賣尛？' }]}
    >
      <Checkbox.Group options={serveOptions} />
    </Form.Item>
  );
  
  const foundLocationOptions = ["USA", "Japan", "Taiwan", "Canada"]
  const foundLocationFormItem = (
    <Form.Item
      label="foundLocation"
      name="foundLocation"
      rules={[{ required: true, message: '你背後是誰!' }]}
    >
      <Radio.Group options={foundLocationOptions}>
      </Radio.Group>
    </Form.Item>
  );

  const footer = generateModelFooter()
  return (
    <>
      <Modal
        title={props.isAdd? "蓋餐廳" : "改裝餐廳"}
        visible={props.visible}
        onCancel={props.onCancel}
        footer={footer}
      >
        <Form form={form} onFinish={testFinish} id="RestaurantForm" >
          {nameFormItem}
          {descriptionFormItem}
          {ratingFormItem}
          {isOnSaleFormItem}
          {serveListFormItem}
          {foundLocationFormItem}
        </Form>
      </Modal>
    </>
  );

};




export default EditModel;