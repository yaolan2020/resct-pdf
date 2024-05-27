import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Radio, Row, Col, message } from 'antd';
import loginApi from 'api/login';

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
const UserInfo = (props) => {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();

  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = () => {
    form.validateFields().then((fieldsValue) => {
      loginApi.updateUserInfo(fieldsValue).then((res) => {
        if (res.data.data !== 0) {
          message.success('修改成功');
          onCancel();
        } else {
          message.error('修改失败');
        }
      });
    });
  };

  useEffect(() => {
    loginApi.getUserInfo().then((res) => {
      const { data } = res.data;
      if (data) {
        setUserInfo(data);
        form.setFieldsValue({ ...data });
      }
    });
  }, []);

  return (
    <Modal
      title="个人信息维护"
      open={visible}
      maskClosable={false}
      centered
      width={700}
      onCancel={() => onCancel(false)}
      okText="保存修改"
      onOk={handleSubmit}
    >
      <Form {...formItemLayout} form={form}>
        <Row className="row">
          <Col span={12}>
            <Form.Item label="账号">{userInfo.username || ''}</Form.Item>
            <Form.Item label="姓名" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="性别" name="sex">
              <Radio.Group>
                <Radio value={'男'}>男</Radio>
                <Radio value={'女'}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="手机号" name="tel">
              <Input />
            </Form.Item>
            <Form.Item label="联系地址" name="addr">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="部门">{userInfo.deptName || ''}</Form.Item>
            <Form.Item label="身份证号" name="idcard">
              <Input />
            </Form.Item>
            <Form.Item label="职务" name="duty">
              <Input />
            </Form.Item>
            <Form.Item label="邮箱" name="email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserInfo;
