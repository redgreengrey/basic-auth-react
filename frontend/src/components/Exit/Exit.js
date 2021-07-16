import styles from "./Exit.module.css";
import { LogoutOutlined } from "@ant-design/icons";
import { withAuth } from "../../Auth";

const Exit = withAuth(({ unauthorize }) => {
  return (
    <div className={styles.exit}>
      <LogoutOutlined onClick={unauthorize} />
    </div>
  );
});

export default Exit;
