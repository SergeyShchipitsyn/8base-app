import React from 'react';


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (
  {
    children,
    type = 'button',
    ...props
  }
) => (
  <button
    type={type}
    {...props}
  >
    {children}
  </button>
);


export { Button };
