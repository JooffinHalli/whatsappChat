import { FC } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "../styles.module.css";

export const Item: FC<{

  label: string;
  isActive: boolean;
  onClick: (label: string) => void;

}> = ({ label, isActive, onClick }) => {

  const click = () => {
    onClick(label);
  }

  const cn = isActive
    ? `${styles.item} ${styles.item_active}`
    : styles.item;

  return (
    <div className={cn} onClick={click}>
      <Avatar size={40} icon={<UserOutlined />} />
      {label}
    </div>
  );
}