import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import utils from 'utils';
import dimLabelContentApi from 'api/system/dimLabelContent';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};
const Edit = (props) => {
  const { pkInfo, handleClose } = props;

  const [form] = Form.useForm();

  const isAddHandle = utils.isNullOrEmpty(pkInfo);

  const handleSubmit = () => {
    form.validateFields().then((fieldsValue) => {
      addOrUpdate(fieldsValue);
    });
  };

  const addOrUpdate = (values) => {
    let handleTitle = isAddHandle ? '添加' : '编辑';
    let status = isAddHandle ? 'add' : 'update';
    dimLabelContentApi.addOrUpdate(isAddHandle, values).then((res) => {
      if (res.data.data !== 0) {
        message.success(`${handleTitle}成功`);
        handleClose(status);
      } else {
        message.error(`${handleTitle}失败`);
      }
    });
  };

  // useEffect(() => {
  //   if (!isAddHandle) {
  //     dimLabelContentApi.detail(pkInfo).then((res) => {
  //       let data = res.data.data;
  //       if (data) {
  //         setFormData(data);
  //       }
  //     });
  //   } else {
  //     setFormData({});
  //   }
  // }, []);

  return (
    <div>
      <Form {...formItemLayout} form={form} initialValues={pkInfo}>
        <Form.Item name="labelId" style={{ display: 'none' }}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="标签名称" name="labelName">
          <Input />
        </Form.Item>
      </Form>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #D9D9D9',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }}
      >
        <Button style={{ marginRight: '10px' }} onClick={() => handleClose(false)}>
          取消
        </Button>
        <Button onClick={handleSubmit} type="primary">
          提交
        </Button>
      </div>
    </div>
  );
};
export default Edit;
