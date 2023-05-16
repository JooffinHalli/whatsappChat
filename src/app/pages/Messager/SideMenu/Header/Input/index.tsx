import { FC } from "react";
import { Row, InputNumber } from "antd";
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";

export const Input: FC = () => {

  return (
    <Row className={styles.wrapper} align="bottom" justify="center">
      <div className={styles.inputWrapper}>
        <InputNumber
          addonBefore={<UserOutlined />}
          prefix="+7"
          maxLength={10}
          style={{ width: "100%" }}
        />
      </div>

      <div className={styles.iconWrapper}>
        <PlusOutlined className={styles.icon} title="Add chat" />
      </div>
    </Row>
  );
};
