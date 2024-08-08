import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.scss';

interface Props {
  open?: boolean | undefined | null;  // Fixed type to boolean
  onClose?: (e:any) => void // Updated type to a function
  children?: React.ReactNode;
  size?:'xs' | "sm" | "md" | "lg" 
}

const Modal: React.FC<Props> = ({ children, onClose,size="md", open = false }) => { // Fixed default prop value
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.(false); // Call onClose if provided
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Added onClose as a dependency
  if (!open) return null; // Return null if the modal is not open

  return createPortal(
    <div  className={style["ModalAddField-overlay"]}>
      <div ref={dropdownRef} className={`${style["ModalAddField-content"]} ${style[size]}`}>
        {children}
      </div>
    </div>,
    document.body as HTMLElement
  );
};


interface HeaderContentProps {
  children: React.ReactNode;
  className?:String,
  style?:Object
}

const HeaderContent: React.FC<HeaderContentProps> = ({ children,className="",style:customStyle }) => {
  return (
    <div style={customStyle} className={`${style["ModalHeader-Content"]} ${className}`}>
      {children}
    </div>
  );
}

const FooterContent: React.FC<HeaderContentProps> = ({ children,className="",style:customStyle }) => {
  return (
    <div style={customStyle} className={`${style["ModalFooter-Content"]} ${className}`}>
      {children}
    </div>
  );
}
const BodyContent: React.FC<HeaderContentProps> = ({ children,className="",style:customStyle }) => {
  return (
    <div style={customStyle} className={`${style["ModalBody"]} ${className}`}>
      {children}
    </div>
  );
}



export { Modal,HeaderContent,FooterContent,BodyContent };
