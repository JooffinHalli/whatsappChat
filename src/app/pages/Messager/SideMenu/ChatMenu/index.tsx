import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Item } from "./Item";
import styles from "./styles.module.css";

export const ChatMenu: FC = observer(() => {

  const { menu } = useMst();

  return (
    <div className={styles.content}>

      {!!menu.items.length && <div className={styles.devider}></div>}

      {menu.items.map(({ phoneNumber }) => {
        return (
          <Item
            key={phoneNumber}
            label={phoneNumber}
            isActive={menu.activeItem === phoneNumber}
            onClick={menu.setActiveItem}
          />
        );
      })}

    </div>
  );
});
