"use client";
import React from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, Field, FormikValues, FieldProps } from "formik";
import * as Yup from "yup";

interface FormValues extends FormikValues {
  address: string;
  amount: number;
}
const FORM_SCHEMA: Yup.Schema<FormValues> = Yup.object().shape({
  address: Yup.string()
    .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
    .required(),
  amount: Yup.number().moreThan(0).required(),
});

export default function SendForm() {
  return (
    <Formik<FormValues>
      validationSchema={FORM_SCHEMA}
      initialValues={{ address: "", amount: 0 }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, isValid, isInitialValid, dirty }) => (
        <Form className="flex flex-col gap-3 py-4 w-full">
          <Field name="address">
            {({ field, form, meta }: FieldProps<FormValues["address"]>) => (
              <TextField
                {...field}
                label="Address"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="amount">
            {({ field, meta }: FieldProps<FormValues["amount"]>) => (
              <TextField
                {...field}
                label="Amount"
                type="amount"
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
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
}
