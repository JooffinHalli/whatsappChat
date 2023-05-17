import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Avatar, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export const Header: FC = observer(() => {

  const { menu } = useMst();

  return (
    <Row className={styles.header} align="bottom">
      <Space size="middle">
        
        <Avatar size={40} icon={<UserOutlined />} />

        {menu.activeItem}
        
      </Space>
    </Row>
  );
});
