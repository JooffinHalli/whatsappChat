import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Row } from "antd";
import { Input } from "./Input";
import styles from "./styles.module.css";

export const Header: FC = observer(() => {

  const { auth } = useMst();

  return (
    <Row className={styles.header} align="bottom">
      <Input />
    </Row>
  );
});
