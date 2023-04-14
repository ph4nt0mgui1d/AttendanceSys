import { Button, Form, Input, InputNumber, Alert } from "antd";
import { useState } from "react";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const NewEmp = () => {
  const [loadings, setLoadings] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertVal, setAlertVal] = useState({
    type: "",
    message: "",
    description: "",
  });
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoadings(true);
    let formdata = new FormData();
    formdata.append("name", values.user.name);
    formdata.append("designation", values.user.designation);
    formdata.append("email", values.user.email);
    formdata.append("mobile", values.user.mobile);

    const response = await fetch(
      "http://192.168.1.20:7882/apicrudphp/api/create.php",
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await response.json();
    setShowSuccess(true);
    if (data === 1) {
      setAlertVal({
        type: "success",
        message: "Success",
        description: "Employee Added Successfully !!!",
      });

      setLoadings(false);
      form.resetFields();
    } else {
      setLoadings(false);
      setAlertVal({
        type: "error",
        message: "Failed",
        description: "Unknown Error Occured !!!",
      });
    }
  };
  setTimeout(() => {
    setShowSuccess(false);
  }, 3000);
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Form
        {...layout}
        name="nest-messages"
        form={form}
        onFinish={onFinish}
        style={{
          width: "600px",
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["user", "designation"]}
          label="Designation"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "mobile"]}
          label="Mobile"
          rules={[
            {
              required: true,
              type: "number",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loadings}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {showSuccess && (
        <Alert
          message={alertVal.message}
          description={alertVal.description}
          type={alertVal.type}
          showIcon
          style={{ width: "30%", position: "absolute", right: "30px" }}
        />
      )}
    </div>
  );
};

export default NewEmp;
