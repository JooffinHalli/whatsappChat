import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Col, Row } from "antd";
import { Content } from "./Content";
import { Header } from "./Header";
import { Input } from "./Input";
import { NoContent } from "./NoContent";
import styles from "./styles.module.css";

export const Chat: FC = observer(() => {

  const { menu } = useMst();

  if (!menu.activeItem) return <NoContent />;

  return (
    <Row className={styles.wrapper}>
      <Col span={24}>
        <Header />
        <Content />
        <Input />
      </Col>
    </Row>
  );
});
