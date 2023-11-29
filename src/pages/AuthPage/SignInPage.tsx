import { Button, Col, Row, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useSignInMutation } from "./hooks";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useAuthContext";
import { FormInput } from "../../components/forms/FormInput";
import { LeftColumn } from "./components/LeftColumn";
import { Link } from "react-router-dom";
import { PageTitle } from "./components/PageTitle";

const { Text } = Typography;

const schema = z.object({
  username: string().min(1, { message: "Username is required" }),
  password: string().min(1, { message: "Password is required" }),
});

type FormType = z.infer<typeof schema>;

export const SignInPage = () => {
  const { mutateAsync, isLoading, isError, error } = useSignInMutation();
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
    })
      .then(({ user, token }) => {
        setToken(token);
        setUser(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row style={{ paddingRight: "100px", paddingLeft: "100px" }} gutter={150}>
      <LeftColumn />
      <Col style={{ padding: "20px" }} span={12}>
        <PageTitle title="Sign In" />
        <form onSubmit={handleSubmit(handleSave)}>
          <FormInput
            label="Username"
            name="username"
            control={control}
            suffix={<UserOutlined />}
            placeholder="Enter username"
            error={errors.username?.message}
          />
          <FormInput
            label="Password"
            name="password"
            control={control}
            type="password"
            suffix={<LockOutlined />}
            placeholder="Enter password"
            error={errors.password?.message}
          />
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
        <Text
          style={{ marginTop: "15px", display: "block", textAlign: "center" }}
        >
          Dont have an account?{" "}
          <Link style={{ color: "black", fontWeight: "600" }} to="/register">
            Sign up!
          </Link>
        </Text>
      </Col>
    </Row>
  );
};
