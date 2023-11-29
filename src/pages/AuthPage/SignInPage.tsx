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
      .then((data) => {
        if (data) {
          setToken(data.token);
          setUser(data.user);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row style={{ padding: "100px", minHeight: "100vh" }}>
      <LeftColumn />
      <Col
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          display: "flex",
          flexDirection: "column",
        }}
        span={24}
        xl={12}
      >
        <PageTitle title="Sign In" />
        <form
          onSubmit={handleSubmit(handleSave)}
          style={{ flex: 1, position: "relative", minHeight: "250px" }}
        >
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
          <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Button
              disabled={isLoading}
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
            >
              Sign In
            </Button>
            {isError && <Text type="danger">{error.message}</Text>}
          </div>
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
