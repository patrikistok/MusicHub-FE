import { Button, Col, Row, Typography } from "antd";
import { LeftColumn } from "./components/LeftColumn";
import { string, z } from "zod";
import { useSignUp } from "../../queries";
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
import { Link } from "react-router-dom";

const { Text } = Typography;

const schema = z
  .object({
    username: string()
      .min(1, {
        message: "Username is required",
      })
      .min(3, { message: "Username must contain at least 3 characters" }),

    name: string()
      .min(1, { message: "Name is required" })
      .refine((name) => name.trim().split(" ").length >= 2, {
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
  const { mutateAsync, isLoading, isError, error } = useSignUp();
  const { handleSubmit, formState, control } = useForm<FormType>({
    defaultValues: { username: "", name: "", password: "", email: "" },
    resolver: zodResolver(schema),
  });

  const { errors } = formState;
  const { setToken, setUser } = useContext(AuthContext);

  const onSubmit = async (formValues: FormType) => {
    console.log(formValues);
    mutateAsync({
      username: formValues.username,
      name: formValues.name,
      password: formValues.password,
      email: formValues.email,
    }).then(({ user, token }) => {
      setToken(token);
      setUser(user);
    });
  };

  return (
    <Row style={{ paddingRight: "100px", paddingLeft: "100px" }} gutter={150}>
      <LeftColumn />
      <Col span={12}>
        <PageTitle title="Sign Up" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Full name"
            name="name"
            control={control}
            suffix={<IdcardOutlined />}
            placeholder="Enter your name"
            error={errors.name?.message}
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
            error={errors.name?.message}
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
          <Button
            disabled={isLoading}
            htmlType="submit"
            type="primary"
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
          {isError && <Text type="danger">{error.message}</Text>}
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
