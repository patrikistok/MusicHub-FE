import { Button, Col, Row, Typography } from "antd";
import { LeftColumn } from "./components/LeftColumn";
import { string, z } from "zod";
import { useSignUpMutation } from "./hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useAuthContext";
import { PageTitle } from "./components/PageTitle";
import { FormInput } from "../../components/forms/FormInput";
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { hashPassword } from "./utils";
import { Link, useNavigate } from "react-router-dom";

const { Text } = Typography;

const schema = z
  .object({
    username: string()
      .min(1, {
        message: "Username is required",
      })
      .min(3, { message: "Username must contain at least 3 characters" }),

    fullName: string()
      .min(1, { message: "Name is required" })
      .refine((fullName) => fullName.trim().split(" ").length >= 2, {
        message: "This is not a valid name",
      }),

    email: string()
      .min(1, { message: "Email is required" })
      .email({ message: "That is not valid email" }),

    password: string().min(1, { message: "Password is required" }),

    confirmPassword: string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

type FormType = z.infer<typeof schema>;

export const SignUpPage = () => {
  const { mutateAsync, isLoading, isError, error } = useSignUpMutation();
  const { handleSubmit, formState, control } = useForm<FormType>({
    defaultValues: { username: "", fullName: "", password: "", email: "" },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (formValues: FormType) => {
    hashPassword(formValues.password)
      .then((hashedPassword: string) => {
        mutateAsync({
          username: formValues.username,
          fullName: formValues.fullName,
          password: hashedPassword,
          email: formValues.email,
        })
          .then(() => {
            navigate("/login");
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
        <PageTitle title="Sign Up" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, position: "relative", minHeight: "525px" }}
        >
          <FormInput
            label="Full name"
            name="fullName"
            control={control}
            suffix={<IdcardOutlined />}
            placeholder="Enter your name"
            error={errors.fullName?.message}
          />
          <FormInput
            label="Email"
            name="email"
            control={control}
            suffix={<MailOutlined />}
            placeholder="Enter your email address"
            error={errors.email?.message}
          />
          <FormInput
            label="Username"
            name="username"
            control={control}
            suffix={<UserOutlined />}
            placeholder="Create username"
            error={errors.username?.message}
          />
          <FormInput
            label="Password"
            name="password"
            control={control}
            suffix={<LockOutlined />}
            type="password"
            placeholder="************************"
            error={errors.password?.message}
          />
          <FormInput
            label="Confirm password"
            name="confirmPassword"
            control={control}
            suffix={<LockOutlined />}
            type="password"
            placeholder="************************"
            error={errors.confirmPassword?.message}
          />
          <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Button
              disabled={isLoading}
              htmlType="submit"
              type="primary"
              style={{ width: "100%" }}
            >
              Sign Up
            </Button>
            {isError && <Text type="danger">{error.message}</Text>}
          </div>
        </form>
        <Text
          style={{ marginTop: "15px", display: "block", textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link style={{ color: "black", fontWeight: "600" }} to="/login">
            Sign in!
          </Link>
        </Text>
      </Col>
    </Row>
  );
};
