import { FC } from "react";
import { Result } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export const NoContent: FC = () => {
  
  return (
    <div className={styles.wrapper}>
      <div>
        <Result
          icon={<CommentOutlined />}
          title="Добавьте чат"
        />
      </div>
    </div>
  );
}