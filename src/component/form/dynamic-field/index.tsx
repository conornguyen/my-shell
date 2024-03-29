import React from 'react/index';
import { InputText } from '../input-text/index';
import { InputSelect } from '../input-select/index';

export const DynamicField = (props) => {
 const fieldMap = {
  text: <InputText {...props} />,
  select: <InputSelect {...props} />,
 };
 return fieldMap[props.type];
};
