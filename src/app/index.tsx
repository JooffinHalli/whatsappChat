import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Chat, Auth } from "./pages";

// Начальная логика находится в модели Root

export const App: FC = observer(() => {

  const { auth } =  useMst();

  return (
    <>
      {auth.isAuth ? <Chat /> : <Auth />}
    </>
  );
});