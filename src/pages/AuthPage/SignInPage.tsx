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
import { Link, useNavigate } from "react-router-dom";
import { PageTitle } from "./components/PageTitle";
import { hashPassword } from "./utils";

const { Text } = Typography;

const schema = z.object({
  usernameEmail: string().min(1, { message: "Username or email is required" }),
  password: string().min(1, { message: "Password is required" }),
});

type FormType = z.infer<typeof schema>;

export const SignInPage = () => {
  const { mutateAsync, isLoading, isError, error } = useSignInMutation();
  const { handleSubmit, formState, control } = useForm<FormType>({
    defaultValues: { usernameEmail: "", password: "" },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async (formValues: FormType) => {
    hashPassword(formValues.password)
      .then((hashedPassword: string) => {
        mutateAsync({
          usernameEmail: formValues.usernameEmail,
          password: hashedPassword,
        })
          .then((data) => {
            if (data) {
              console.log(data);
              setToken(data.username);
              setUser({
                id: data.id,
                name: data.fullName,
                username: data.username,
                email: data.email,
              });
              localStorage.setItem("logged", data.username);
              navigate("/");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error("Password hashing error:", error);
      });
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
            label="Username or email"
            name="usernameEmail"
            control={control}
            suffix={<UserOutlined />}
            placeholder="Enter username or email"
            error={errors.usernameEmail?.message}
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
