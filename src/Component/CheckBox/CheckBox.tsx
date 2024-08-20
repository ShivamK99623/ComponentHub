import React, { useState ,} from 'react';
import style from "./checkBox.module.scss";
interface CheckboxSwitchProps  {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    label?: string;
    id?: string;
    name?: string;
}

const CheckboxSwitch: React.FC<CheckboxSwitchProps> = ({
    checked = false,
    onChange,
    disabled = false,
    id,
    name,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const handleToggle = () => {
        if (!disabled) {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
            onChange?.(newCheckedState);
        }
    };
    console.log(React)
    return (
        <label className={`${style["checkbox-switch"]}`} htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={isChecked}
                onClick={handleToggle}
                disabled={disabled}
                className={style["checkbox-switch-input"]}
            />
            <span className={style["checkbox-switch-slider"]}></span>
        </label>
    );
};

export  {CheckboxSwitch};
