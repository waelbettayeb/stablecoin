"use client";
import React from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Formik, Form, Field, FormikValues, FieldProps } from "formik";
import * as Yup from "yup";
import { useRegister } from "../service";
import { useRouter } from "next/navigation";

interface FormValues extends FormikValues {
  email: string;
  password: string;
}

const FORM_SCHEMA: Yup.Schema<FormValues> = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function SignupForm() {
  const router = useRouter();
  const registerMutation = useRegister({
    onSuccess: () => {
      router.replace("/");
    },
  });
  return (
    <Formik<FormValues>
      validationSchema={FORM_SCHEMA}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        await registerMutation.mutateAsync(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, isInitialValid, dirty }) => (
        <Form className="flex flex-col gap-3 max-w-xl py-4 w-full">
          <Field name="email">
            {({ field, form, meta }: FieldProps<FormValues["email"]>) => (
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
            {({ field, meta }: FieldProps<FormValues["password"]>) => (
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
            Sign up
          </Button>
          {registerMutation.error && (
            <Alert severity="error">{registerMutation.error?.message}</Alert>
          )}
        </Form>
      )}
    </Formik>
  );
}
