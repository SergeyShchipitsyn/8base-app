import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../button';

import { KeyCodes } from '../../constants/keyCodes';
import { useClickOutside } from '../../hooks/useClickOutside';

import styles from './Dialog.module.css';


type DialogProps = {
  onClose?: () => void
  title?: string
};

const MODAL_ROOT = document.getElementById('dialogRoot') as HTMLDivElement;

const Dialog: React.FC<DialogProps> = (
  {
    onClose = () => {},
    title,
    children,
  }
) => {
  const container = useMemo(() => document.createElement('div'), []);
  const contentRef = useRef(null);
  container.classList.add(styles.dialog);

  useClickOutside(contentRef, onClose);

  useEffect(() => {
    function onEscapePress(event: KeyboardEvent) {
      if (event.code === KeyCodes.Escape) {
        onClose()
      }
    };

    MODAL_ROOT.appendChild(container);
    document.addEventListener('keydown', onEscapePress);

    return () => {
      MODAL_ROOT.removeChild(container);
      document.removeEventListener('keydown', onEscapePress);
    }
  }, [onClose, container]);

  return createPortal(
    <div ref={contentRef} className={styles.content}>
      <header className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Button className={styles.closeButton} onClick={() => onClose()}>&times;</Button>
      </header>
      {children}
    </div>,
    container
  )
};

export { Dialog };
