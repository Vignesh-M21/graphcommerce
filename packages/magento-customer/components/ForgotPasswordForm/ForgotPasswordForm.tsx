import { Button, Form, FormActions, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import { makeStyles, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from './ForgotPassword.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    alert: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
    },
  }),
  { name: 'ForgotPasswordForm' },
)

export default function ForgotPasswordForm() {
  const classes = useStyles()
  const form = useFormGqlMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
  )
  const { muiRegister, handleSubmit, required, data, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  if (formState.isSubmitSuccessful && data) {
    return (
      <Alert severity='success' variant='standard' className={classes.alert}>
        <Trans>We've send a password reset link to your account!</Trans>
      </Alert>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.email}
          label={<Trans>Email</Trans>}
          required={required.email}
          {...muiRegister('email', {
            required: required.email,
            pattern: { value: emailPattern, message: t`Invalid email address` },
          })}
          helperText={formState.errors.email?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <ApolloCustomerErrorAlert error={error} />

      <FormActions>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
        >
          <Trans>Send password reset email</Trans>
        </Button>
      </FormActions>
    </Form>
  )
}
