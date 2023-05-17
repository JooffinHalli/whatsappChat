import { FC } from "react";
import { Col, Row } from "antd";
import { SideMenu } from "./SideMenu";
import { Chat } from "./Chat";
import styles from "./styles.module.css";

export const Messager: FC = () => {

  return (
    <Row className={styles.wrapper}>

      <Col span={8}>
        <SideMenu />
      </Col>
      
      <Col span={16}>
        <Chat />
      </Col>
      
    </Row>
  );
};
