import { Input } from '@/components/ui/input';
import React from 'react/index';
import { useController } from 'react-hook-form';

export const InputText = ({ className, name, required = false, label } = props) => {
 const {
  field: { value, onChange },
  fieldState: { invalid, error },
 } = useController({
  name,
  rules: { required },
 });

 return (
  <div>
   <Input
    className={className}
    onChange={onChange}
    value={value}
    type='text'
    isInvalid={invalid}
    placeholder={label}
   />
   <div className='text-destructive'>{error?.message && error?.message}</div>
  </div>
 );
};
