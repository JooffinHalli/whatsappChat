import { FC } from "react";
import styles from "./index.module.css";
import { api } from "api";

api.receiveNotification();

export const App: FC = () => {

  return (
    <div className={styles.wrapper}>
      hello from gh-pages with initial api
    </div>
  );
};