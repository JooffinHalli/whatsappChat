import { FC } from "react";
import { Col, Row } from "antd";
import styles from "./styles.module.css";
import { Header } from "./Header";
import { Content } from "./Content";

export const SideMenu: FC = () => {
  return (
    <Row className={styles.wrapper}>
      <Col span={24}>
        <Header />
        <Content />
      </Col>
    </Row>
  );
};
