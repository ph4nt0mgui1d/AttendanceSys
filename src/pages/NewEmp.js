import { Button, Form, Input, InputNumber } from "antd";
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
/* eslint-enable no-template-curly-in-string */

const onFinish = async (values) => {
  let formdata = new FormData();
  formdata.append("name", values.user.name);
  formdata.append("designation", values.user.designation);
  formdata.append("email", values.user.email);
  formdata.append("mobile", values.user.mobile);

  const response = await fetch("http://192.168.1.20/apicrudphp/api/create.php", {
    method: "POST",
    body: formdata
  })
  const data = await response.json();
  
  if(data === 1)
    alert("Success!!")
  else 
    alert("failed")
};

const NewEmp = () => {
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewEmp;
