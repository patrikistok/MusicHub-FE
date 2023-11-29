import { Input, InputProps, Typography } from "antd";
import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";

const { Text } = Typography;

type Props = {
  label?: string;
  name: string;
  control: Control<any, any>;
  error?: string;
} & InputProps;

export const FormInput = ({ label, name, control, error, ...rest }: Props) => {
  return (
    <>
      {label && (
        <Text strong style={{ marginBottom: "10px", display: "block" }}>
          {label}:
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            style={{
              marginBottom: error ? "" : "20px",
              height: "45px",
              fontSize: "18px",
            }}
            {...rest}
          />
        )}
      />
      {error && (
        <Text
          style={{ display: "block", fontSize: "12px", marginBottom: "20px" }}
          type="danger"
        >
          {error}
        </Text>
      )}
    </>
  );
};
