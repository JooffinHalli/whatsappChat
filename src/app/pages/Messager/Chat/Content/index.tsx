import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "antd";
import { useMst } from "mst";
import styles from "./styles.module.css";

export const Content: FC = observer(() => {

  const { chat } = useMst();

  return (
    <Row className={styles.content}>

      <div className={styles.block}>
        {chat.fromMeMessage}
      </div>

      <div className={styles.block}>
        {chat.resposeMessage}
      </div>

    </Row>
  );
});