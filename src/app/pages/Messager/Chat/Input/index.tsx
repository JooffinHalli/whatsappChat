import { FC, useState, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { Row, Input as AntdInput } from "antd";
import { SendOutlined } from '@ant-design/icons';
import styles from "./styles.module.css";
import { useMst } from "mst";

export const Input: FC = observer(() => {

  const { chat } = useMst();

  const [value, setValue] = useState("");

  const change = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  }

  const send = () => {
    chat.send(value);
    setValue("");
  }

  return (
    <Row
      className={styles.wrapper}
      align="bottom"
      justify="center"
    >
      <div className={styles.inputWrapper}>
        <AntdInput
          value={value}
          placeholder="Введите сообщение"
          onChange={change}
          onPressEnter={send}
        />
      </div>
      <div className={styles.iconWrapper}>
        {value.length ? <SendOutlined
          className={styles.icon}
          title="Send"
          onClick={send}
        /> : null}
      </div>
    </Row>
  );
});
