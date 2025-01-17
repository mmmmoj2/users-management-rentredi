/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  FormField,
  Header,
  Input,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useFormikContext } from 'formik';

export const UserForm = () => {
  const formik = useFormikContext<any>();
  const { values, touched, setFieldTouched, errors, setFieldValue } =
    formik || {};

  return (
    <Container header={<Header variant="h2">Users information</Header>}>
      <SpaceBetween direction="vertical" size="l">
        <FormField
          label="Name"
          errorText={
            Boolean(touched?.['name']) && errors?.['name']
              ? errors?.['name']
              : ('' as any)
          }
        >
          <Input
            data-testid="user-name"
            type="text"
            name="name"
            value={values?.['name']}
            onBlur={() => setFieldTouched('name')}
            onChange={(event) => setFieldValue('name', event.detail.value)}
          />
        </FormField>
        <FormField
          label="Zip code"
          errorText={
            Boolean(touched?.['zip']) && errors?.['zip']
              ? errors?.['zip']
              : ('' as any)
          }
        >
          <Input
            data-testid="user-zip"
            name="zip"
            value={values?.['zip']}
            onBlur={() => setFieldTouched('zip')}
            onChange={(event) => setFieldValue('zip', event.detail.value)}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};
