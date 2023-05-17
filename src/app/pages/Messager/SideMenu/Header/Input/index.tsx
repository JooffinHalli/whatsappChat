import { ChangeEvent, FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row, Input as AntdInput, App } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { splitOnChange } from "utils";
import { store, useMst } from "mst";
import styles from "./styles.module.css";

const maxLength = 12;

export const Input: FC = observer(() => {

  const { menu } = useMst();
  const { message } = App.useApp();

  const [value, setValue] = useState("");

  const change = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => splitOnChange(value, prev, maxLength));
  }

  const addChat = () => {
    const _value = `+7 ${value}`;
    if (menu.items.some(({ phoneNumber }) => phoneNumber === _value)) {
      message.error({
        content: "Чат с таким номером уже есть"
      });
      return;
    }
    if (value.length < maxLength) {
      message.error({
        content: "Введите корректный номер"
      });
      return;
    }
    store.menu.add(_value);
    setValue("");
  }

  return (
    <Row className={styles.wrapper} align="bottom" justify="center">

      <div className={styles.inputWrapper}>
        <AntdInput
          addonBefore={<UserOutlined />}
          prefix="+7"
          placeholder="Веедите номер"
          value={value}
          onChange={change}
          onPressEnter={addChat}
        />
      </div>

      <div className={styles.iconWrapper}>
        <PlusOutlined
          className={styles.icon}
          title="Создать чат"
          onClick={addChat}
        />
      </div>

    </Row>
  );
});
