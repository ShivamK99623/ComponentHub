import React, { FC, ReactNode, MouseEvent, ButtonHTMLAttributes } from "react";
import style from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "error" | "text";
    value?: any;
    text?: string;
    children?: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, variant = "primary", className, value, onClick, ...props }) => {

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add(style.ripple);

        const ripple = button.getElementsByClassName(style.ripple)[0];
        
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        }
        createRipple(event);
    };

    return (
        <button
            value={value}
            className={`${style.Button} ${style[`Button-${variant}`]} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

export { Button };
