import { FC } from "react";
import { Col, Row } from "antd";
import { Content } from "./Content";
import { Header } from "./Header";
import { Input } from "./Input";
import styles from "./styles.module.css";

export const Chat: FC = () => {
  return (
    <Row className={styles.wrapper}>
      <Col span={24}>
        <Header />
        <Content />
        <Input />
      </Col>
    </Row>
  );
};
