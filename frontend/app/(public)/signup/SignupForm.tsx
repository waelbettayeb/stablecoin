"use client";
import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, FormikValues, FieldProps } from "formik";
import * as Yup from "yup";

interface FormValues extends FormikValues {
  email: string;
  password: string;
}

const FORM_SCHEMA: Yup.Schema<FormValues> = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function SignupForm() {
  return (
    <Formik<FormValues>
      validationSchema={FORM_SCHEMA}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
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
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            size="large"
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
