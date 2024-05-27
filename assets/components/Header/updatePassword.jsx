import React from 'react';
import { Modal, Input, Form, message } from 'antd';
import authUtils from 'utils/authUtils';
import loginApi from 'api/login';

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.formRef.current.validateFields().then((values) => {
      const { oldPassword, newPassword } = values;
      loginApi.updatePassword({ oldPassword, newPassword }).then((res) => {
        const { data } = res.data;
        if (data === 1) {
          this.props.onCancel();
          Modal.success({
            title: '密码修改成功，请重新登录',
            okText: '知道了',
            onOk: () => {
              authUtils.logout();
            }
          });
        } else if (data === -1) {
          message.error('原密码错误');
        } else {
          message.error('密码修改失败');
        }
      });
    });
  };

  render() {
    const { visible, onCancel } = this.props;
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

    return (
      <Modal
        title="修改密码"
        width={500}
        open={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        centered
        maskClosable={false}
      >
        <Form {...formItemLayout} ref={this.formRef}>
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                min: 6,
                message: '密码不能少于6个字符'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="确认新密码"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认新密码!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不一致!');
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default UpdatePassword;
