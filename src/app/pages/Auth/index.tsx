import { FC } from "react";
import { Button, Checkbox, Form, Input, Row } from "antd";
import { form } from "./constants";
import { useMst } from "mst";
import styles from "./styles.module.css";

export const Auth: FC = () => {
  const { auth } = useMst();

  const finish = ({ IdInstance, ApiTokenInstance, remember }: any) => {
    auth.setIdInstance(IdInstance, remember);
    auth.setApiTokenInstance(ApiTokenInstance, remember);
    auth.login();
  };

  const finishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row className={styles.wrapper} justify="center" align="middle">
      <Form
        name="basic"
        labelCol={form.labelCol}
        wrapperCol={form.wrapperCol}
        style={form.style}
        initialValues={form.initialValues}
        onFinish={finish}
        onFinishFailed={finishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="IdInstance"
          name="IdInstance"
          rules={form.item1.rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ApiTokenInstance"
          name="ApiTokenInstance"
          rules={form.item2.rules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={form.item3.wrapperCol}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={form.item4.wrapperCol}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
