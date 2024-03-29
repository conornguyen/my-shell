import React from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DynamicField } from '@/component/form/dynamic-field';
import { Button } from '@/components/ui/button';

const Register = () => {
 const validationSchema = Yup.object().shape({
  email: Yup.string().required('Username is required').email('Incorrect email format'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  manager: Yup.string().required('Direct manager is required'),
 });
 const formOptions = {
  resolver: yupResolver(validationSchema),
  defaultValues: {
   email: '',
   firstName: '',
   lastName: '',
   manager: '',
  },
 };
 const form = useForm(formOptions);
 const managers = [
  { value: '1', label: 'User 1', avatar: 'user 1' },
  { value: '2', label: 'User 2', avatar: 'user 2' },
  { value: '3', label: 'User 3', avatar: 'user 3' },
 ];

 const formFields = [
  {
   type: 'text',
   name: 'email',
   label: 'Email',
   required: true,
  },
  {
   type: 'text',
   name: 'firstName',
   label: 'First Name',
   required: true,
  },
  {
   type: 'text',
   name: 'lastName',
   label: 'Last Name',
   required: true,
  },
  {
   type: 'select',
   name: 'manager',
   label: 'Direct manager',
   options: managers,
  },
 ];

 const onSubmit = (data) => console.log(data);
 return (
  <div>
   <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
     <h1 className='text-3xl font-bold mb-4 text-center'>Register</h1>
     <div className='grid grid-cols-2 gap-4'>
      {formFields.map((field) => {
       return (
        <DynamicField
         {...field}
         key={field.name}
        />
       );
      })}
     </div>
     <div className='text-center mt-4'>
      <Button type='submit'>Register</Button>
     </div>
    </form>
   </FormProvider>
  </div>
 );
};

export default Register;
