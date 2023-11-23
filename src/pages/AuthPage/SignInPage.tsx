import { Avatar, Button, Col, Image, Row, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useSignIn } from "../../queries";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useAuthContext";
import { FormInput } from "../../components/forms/FormInput";
import { Link } from "react-router-dom";

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
    <Row style={{ paddingRight: "100px", paddingLeft: "100px" }} gutter={150}>
      <Col
        span={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Avatar
          alt="Dancing Kellie Pickler"
          src={process.env.PUBLIC_URL + "/imgs/LoginGiph.gif"}
          size={400}
        />
      </Col>
      <Col style={{ textAlign: "center", padding: "20px" }} span={12}>
        <Title style={{ marginBottom: "10px" }}>Login</Title>
        <Text style={{ marginBottom: "50px", display: "block" }}>
          Join MusicHub to get started
        </Text>
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
          <Text
            style={{ display: "block", fontSize: "12px", marginTop: "300px" }}
            type="danger"
          >
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
        <Text style={{ marginTop: "15px", display: "block" }}>
          Dont have an account?{" "}
          <Link style={{ color: "black", fontWeight: "600" }} to="/register">
            Sign up!
          </Link>
        </Text>
      </Col>
    </Row>
  );
};
