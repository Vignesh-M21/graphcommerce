import { makeStyles, TextField } from '@material-ui/core'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import useFormValidFields from '@reachdigital/react-hook-form/useFormValidFields'
import { phonePattern } from '@reachdigital/react-hook-form/validationPatterns'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import { AccountAddressFragment } from '../AccountAddress/AccountAddress.gql'
import AddressFields from '../AddressFields'
import NameFields from '../NameFields'
import {
  UpdateCustomerAddressDocument,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
} from './UpdateCustomerAddress.gql'

const useStyles = makeStyles(
  () => ({
    editActions: {
      paddingBottom: 0,
    },
  }),
  { name: 'EditAddressForm' },
)

type EditAddressFormProps = {
  address?: AccountAddressFragment
} & CountryRegionsQuery

export default function EditAddressForm(props: EditAddressFormProps) {
  const { countries, address } = props
  const formClasses = useFormStyles()
  const classes = useStyles()
  const router = useRouter()

  const form = useFormGqlMutation<
    UpdateCustomerAddressMutation,
    UpdateCustomerAddressMutationVariables
  >(UpdateCustomerAddressDocument, {
    defaultValues: {
      id: address?.id ?? undefined,
      firstname: address?.firstname,
      lastname: address?.lastname,
      street: address?.street?.[0] ?? undefined,
      postcode: address?.postcode,
      city: address?.city,
      countryCode: address?.country_code,
      telephone: address?.telephone,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      houseNumber: address?.street?.[1],
      addition: address?.street?.[2],
    },
    onBeforeSubmit: (formData) => {
      const region = countries
        ?.find((country) => country?.two_letter_abbreviation === formData.countryCode)
        ?.available_regions?.find((r) => r?.id === formData.region)
      const regionData = {
        region:
          (region && {
            region: region.name,
            region_code: region.code,
            region_id: region.id,
          }) ??
          null,
      }

      return {
        ...formData,
        ...regionData,
      }
    },
    onComplete: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/account/addresses')
    },
  })

  const { handleSubmit, formState, required, error, errors, register, watch } = form
  const submitHandler = handleSubmit(() => {})

  const checkIcon = <InputCheckmark />
  const validFields = useFormValidFields({ form: { watch, required, errors } })

  return (
    <>
      <form onSubmit={submitHandler} noValidate className={formClasses.form}>
        <NameFields
          {...form}
          validFields={validFields}
          disableFields={formState.isSubmitting}
          fieldOptions={{
            prefix: {
              name: 'prefix',
              required: required.prefix,
            },
            firstname: {
              name: 'firstname',
              required: required.firstname,
            },
            lastname: {
              name: 'lastname',
              required: required.lastname,
            },
          }}
        />
        <AddressFields
          {...form}
          validFields={validFields}
          countries={countries}
          regionId={address?.region?.region_id ?? undefined}
          disableFields={formState.isSubmitting}
          fieldOptions={{
            street: {
              name: 'street',
              required: required.street,
            },
            houseNumber: {
              name: 'houseNumber',
              required: true,
            },
            addition: {
              name: 'addition',
              required: false,
            },
            postcode: {
              name: 'postcode',
              required: required.postcode,
            },
            city: {
              name: 'city',
              required: required.city,
            },
            countryCode: {
              name: 'countryCode',
              required: required.countryCode,
            },
            regionId: {
              name: 'region',
              required: required.region,
            },
          }}
        />

        <div className={formClasses.formRow}>
          <TextField
            variant='outlined'
            type='text'
            error={!!errors.telephone}
            required={required.telephone}
            name='telephone'
            label='Telephone'
            inputRef={register({
              required: required.telephone,
              pattern: { value: phonePattern, message: 'Invalid phone number' },
            })}
            helperText={formState.isSubmitted && errors.telephone?.message}
            disabled={formState.isSubmitting}
            InputProps={{
              endAdornment: validFields.telephone && checkIcon,
            }}
          />
        </div>

        <div className={formClasses.divider} />

        <div className={clsx(formClasses.actions, classes.editActions)}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={formState.isSubmitting}
          >
            Save changes
          </Button>
        </div>
      </form>

      <ApolloErrorAlert error={error} />
    </>
  )
}
