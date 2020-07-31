import React from 'react';


type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: SelectOption[]
};

export type SelectOption = {
  value: string | number
  label: string
};

const Select: React.FC<SelectProps> = ({
  onChange = () => {},
  options = []
}) => {
  return (
    <select onChange={onChange}>
      {options.map(option => (
        <option value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
};

export { Select };
