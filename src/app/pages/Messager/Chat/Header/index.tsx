import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "mst";
import { Row, Space, Typography } from "antd";
import styles from "./styles.module.css";

const { Title  } = Typography;

export const Header: FC = observer(() => {

  const { auth } = useMst();

  return (
    <Row className={styles.header} align="bottom">
      <Space size="middle">
        
        <Title ellipsis={true} level={3} title="Я">
          Я
        </Title>

        <Space size="small">
          <Title ellipsis={true} level={5} title="IdInstance">
            {"( IdInstance: "}
          </Title>
          <Title ellipsis={true} level={5} title={auth.IdInstance}>
            {auth.IdInstance}
          </Title>
        </Space>

        <Space size="small">
          <Title ellipsis={true} level={5} title="ApiTokenInstance">
            ApiTokenInstance:
          </Title>
          <Title ellipsis={true} level={5} title={auth.ApiTokenInstance}>
            {`${auth.ApiTokenInstance} )`}
          </Title>
        </Space>
        
      </Space>
    </Row>
  );
});
