"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, TextField } from "@mui/material";
import { Formik, Form, Field, FormikValues, FieldProps } from "formik";
import * as Yup from "yup";
import { useLogin } from "../service";

interface LoginFormValues extends FormikValues {
  email: string;
  password: string;
}

const LOGIN_FORM_SCHEMA: Yup.Schema<LoginFormValues> = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin({
    onSuccess: () => {
      router.replace("/");
    },
  });
  return (
    <Formik<LoginFormValues>
      validationSchema={LOGIN_FORM_SCHEMA}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        await loginMutation.mutateAsync(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, isInitialValid, dirty }) => (
        <Form className="flex flex-col gap-3 max-w-xl py-4 w-full">
          <Field name="email">
            {({ field, form, meta }: FieldProps<LoginFormValues["email"]>) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: FieldProps<LoginFormValues["password"]>) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Button
            type="submit"
            disabled={isSubmitting || (!isInitialValid && !dirty) || !isValid}
            variant="contained"
            color="primary"
            size="large"
          >
            Sign in
          </Button>
          {loginMutation.error && (
            <Alert severity="error">{loginMutation.error?.message}</Alert>
          )}
        </Form>
      )}
    </Formik>
  );
}
