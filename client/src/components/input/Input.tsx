import React from 'react';


type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (
  {
    onChange = () => {},
    value = '',
    ...props
  }
) => (
  <input
    onChange={onChange}
    value={value}
    {...props}
  />
);

export { Input };
