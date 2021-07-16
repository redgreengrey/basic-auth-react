import { useState } from "react";
import styles from "./SignUp.module.css";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../../Auth";

const SignUp = withAuth(({ authorize }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("http://localhost:5000/api/signup", values)
      .then((res) => {
        setMessage(res.data.message);
        authorize();
      })
      .catch((res) => setError("That username already exist"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.signup}>
      <h2 className={styles.title}>
        Be welcome to create an account! Or You can
        <Link to="/login">
          <span> log in... </span>
        </Link>
        if You already have an account.
      </h2>
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
            { min: 4, message: "Username must be minimum 4 characters." },
            { max: 10, message: "Username must be minimum 10 characters." },
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
            Sign up
          </Button>
        </Form.Item>
      </Form>
      {message && <h2 style={{ color: "indigo" }}>{message + "!!!"}</h2>}
      {error && <h2 style={{ color: "indigo" }}>{error + "!"}</h2>}
    </div>
  );
});

export default SignUp;
