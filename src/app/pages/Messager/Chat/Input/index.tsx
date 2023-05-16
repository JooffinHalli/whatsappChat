import { FC } from "react";
import { Row, Input as AntdInput } from "antd";
import { SendOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";

export const Input: FC = () => {

  return (
    <Row
      className={styles.wrapper}
      align="bottom"
      justify="center"
    >
      <div className={styles.inputWrapper}>
        <AntdInput
          placeholder="Введите сообщение"
        />
      </div>
      <div className={styles.iconWrapper}>
        <SendOutlined
          className={styles.icon}
          title="Send"
        />
      </div>
    </Row>
  );
};
