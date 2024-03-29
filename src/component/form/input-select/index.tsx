import React from 'react/index';
import { useController } from 'react-hook-form';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';

export const InputSelect = ({ className, label, name, required = false, options = [] } = props) => {
 const {
  field: { value, onChange },
  fieldState: { invalid, error },
 } = useController({
  name,
  rules: { required },
 });

 return (
  <div>
   <Select
    defaultValue={value}
    className={className}
    onValueChange={onChange}
   >
    <SelectTrigger>
     <SelectValue placeholder={label} />
    </SelectTrigger>
    <SelectContent>
     {options.map((option) => (
      <SelectItem
       key={option.value}
       value={option.value}
      >
       {option.label}
      </SelectItem>
     ))}
    </SelectContent>
   </Select>
   <div className='text-destructive'>{error?.message && error?.message}</div>
  </div>
 );
};
