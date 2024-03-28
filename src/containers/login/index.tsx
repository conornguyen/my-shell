import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, FormProvider, useFormContext } from 'react-hook-form';


const Login = () => {
 const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').email('Incorrect email format'),
  password: Yup.string().required('Password is required'),
 });
 const formOptions = {
  resolver: yupResolver(validationSchema), defaultValues: {
   username: '',
   password: '',
  },
 };
 const { register, handleSubmit, formState } = useForm(formOptions);

 const onSubmit = (data) => console.log(data);
 return <div>
  <form onSubmit={handleSubmit(onSubmit)}>
   <div className='flex items-center flex-col gap-4'>
    <h1 className='text-3xl font-bold underline'>
     Login
    </h1>
    <Input
     className='max-w-xs'
     placeholder="Email"
     isInvalid={!!formState.errors['username']}
     errorMessage={formState.errors['username']?.message}
     label='Email' {...register('username')}
    />
    <Input
     placeholder="Password"
     className='max-w-xs'
     isInvalid={!!formState.errors['password']}
     errorMessage={formState.errors['password']?.message}
     {...register('password')}
    />
    <Button type='submit'>Login</Button>
   </div>
  </form>
 </div>;
};

export default Login;
