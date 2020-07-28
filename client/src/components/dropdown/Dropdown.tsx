import React, { useRef } from 'react';
import classNames from 'classnames';

import { useClickOutside } from '../../hooks/useClickOutside';

import styles from './Dropdown.module.css';


type DropdownProps = {
  onClose?: () => void
  isOpen?: boolean
  className?: string
};

const Dropdown: React.FC<DropdownProps> = (
  {
    onClose = () => { },
    isOpen = false,
    className = '',
    children
  }
) => {
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, onClose)

  return (
    <div
      ref={ref}
      className={classNames(styles.dropdown, {
        [styles.dropdown_isOpen]: isOpen,
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

export { Dropdown };
