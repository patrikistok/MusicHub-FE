import { Button, Col, Input, Row, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useSignIn } from "../../queries";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useAuthContext";
import { FormInput } from "../../components/forms/FormInput";

const { Text, Title } = Typography;

const schema = z.object({
  username: string().min(1, { message: "Username is required" }),
  password: string().min(1, { message: "Password is required" }),
});

type FormType = z.infer<typeof schema>;

export const SignInPage = () => {
  const { mutateAsync, isLoading, isError, error } = useSignIn();
  const { handleSubmit, formState, control } = useForm<FormType>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const { setToken, setUser } = useContext(AuthContext);

  const handleSave = async (formValues: FormType) => {
    console.log(formValues);
    mutateAsync({
      username: formValues.username,
      password: formValues.password,
    }).then(({ user, token }) => {
      setToken(token);
      setUser(user);
    });
  };

  return (
    <Row>
      <Col span={16}></Col>
      <Col style={{ textAlign: "center", padding: "20px" }} span={8}>
        <Title>Login</Title>
        <Text>Join MusicHub to get started</Text>
        <form onSubmit={handleSubmit(handleSave)} style={{ textAlign: "left" }}>
          <FormInput
            label="Username"
            name="username"
            control={control}
            suffix={<UserOutlined />}
            placeholder="Enter username"
          />
          <Text style={{ display: "block", fontSize: "12px" }} type="danger">
            {errors.username?.message}
          </Text>
          <FormInput
            label="Password"
            name="password"
            control={control}
            type="password"
            suffix={<KeyOutlined />}
            placeholder="Enter password"
          />
          <Text style={{ display: "block", fontSize: "12px" }} type="danger">
            {errors.password?.message}
          </Text>
          <Button
            disabled={isLoading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%" }}
          >
            Sign In
          </Button>
          {isError && <Text type="danger">{error.message}</Text>}
        </form>
      </Col>
    </Row>
  );
};
