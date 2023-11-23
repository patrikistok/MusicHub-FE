import { Input, InputProps, Typography } from "antd";
import React from "react";
import { Controller, Control } from "react-hook-form";

const { Text } = Typography;

type Props = {
  label?: string;
  name: string;
  control: Control<any, any>;
} & InputProps;

export const FormInput = ({ label, name, control, ...rest }: Props) => {
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
          <Input {...field} style={{ marginBottom: "20px" }} {...rest} />
        )}
      />
    </>
  );
};
