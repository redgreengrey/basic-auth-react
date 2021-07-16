import { useState } from "react";
import styles from "./Login.module.css";
import { Form, Input, Button } from "antd";
import { withAuth } from "../../Auth";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = withAuth(({ isAuthorized, authorize }) => {
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/login", values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          authorize(values.username);
        }
      })
      .catch((res) => setError("That username already exist"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className={styles.login}>
        <h2 className={styles.title}>
          Have an account? Log in! Or You can{" "}
          <Link to="/signup">
            <span>create it... </span>
          </Link>
        </h2>
        <h3>{isAuthorized}</h3>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      {error && <h2 style={{ color: "indigo" }}>{error + "!"}</h2>}
    </div>
  );
});

export default Login;
