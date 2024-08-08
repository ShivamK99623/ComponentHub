import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Icon } from '@iconify/react';
import style from './Dropdown.module.scss';
import { Modal, HeaderContent, FooterContent, BodyContent } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { createPortal } from 'react-dom';

type ObjConfigType = Record<string, any>;

type ExtractKeys<T> = keyof T;

type Option<T extends ObjConfigType> = {
    [K in keyof T]: T[K] extends 'string'
    ? string
    : T[K] extends 'number'
    ? number
    : T[K] extends 'boolean'
    ? boolean
    : any;
}

type ConfigType = "string" | "boolean" | "number";

interface Props<T extends ObjConfigType> {
    onChange?: (value: Option<T> | null) => void | null;
    value?: Option<T> | null;
    options?: Array<Option<T>>;
    className?: string;
    name?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    ObjConfig: Array<{
        id: string;
        type: ConfigType;
        label?: string;
    }>;
    useFieldAs: { id: ExtractKeys<T>, label: ExtractKeys<T> };
    onhandleDelete?: (id: string) => string;
    onhandleAdd?: (field: Option<T>) => boolean;
    onhandleUpdate?: (field: Option<T>) => boolean;
    disabled?: boolean;
    isClearable?: boolean;
}

const CustomActionSelect = <T extends ObjConfigType>({
    onChange,
    value = null,
    options = [],
    className = '',
    name = '',
    required = false,
    label,
    placeholder = "",
    onhandleDelete,
    onhandleAdd,
    ObjConfig = [],
    useFieldAs = { id: "id", label: "label" },
    onhandleUpdate,
    disabled = false,
    isClearable = false
}: Props<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean | undefined>(false);
    const [editOption, setEditOption] = useState<Option<T> | any>({});
    const dropdownRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                (!modalRef.current || !modalRef.current.contains(event.target as Node)) &&
                (!optionRef.current || !optionRef.current.contains(event.target as Node))
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = useCallback(() => setOpen(prevOpen => !prevOpen), []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value), []);

    const placeholderText = value?.[useFieldAs.label] ? String(value[useFieldAs.label]) : placeholder;

    const handleEdit = useCallback((option: Option<T>) => { setEditOption(option); setModalOpen(true) }, []);

    const filteredOptions = Array.isArray(options) ? options?.filter(option => String(option[useFieldAs.label])?.toLowerCase().includes(searchTerm.toLowerCase())) : options;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, name, type, checked } = e.target;
        setEditOption((prev: any) => prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : {});
    };

    return (
        <div ref={dropdownRef} className={`${style.customDropdown} ${className}`}>
            {label && (
                <label className={`${style["custom-dropdown-label"]} ${required ? 'required' : ''}`} htmlFor={name}>
                    {label}
                </label>
            )}
            <div className={style["custom-dropdown-input-container"]}>
                <input
                    type="text"
                    value={searchTerm}
                    disabled={disabled}
                    placeholder={String(placeholderText)}
                    onChange={handleInputChange}
                    onClick={() => setOpen(true)}
                    className={`${style["custom-dropdown-input"]} ${value?.[useFieldAs.label] && style["placeholder-active"]} ${style["overflow-ellipsis"]}`}
                /> <span style={{ color: "var(--border)" }}>|</span>
                {isClearable && (
                    <Icon aria-disabled={!value?.[useFieldAs.label]} onClick={() => { onChange?.(null) }} icon="charm:cross" className={style['custom-dropdown-icon-cross']} />
                )}
                <Icon icon={`mingcute:${!open ? "down" : "up"}-line`} className={style['custom-dropdown-icon-arrow']} />
            </div>
            {open && (
                createPortal(
                    <div ref={optionRef}>
                        <ul
                            className={style['custom-dropdown-menu']}
                            style={{
                                position: 'absolute',
                                zIndex: 1300,
                                top: (dropdownRef?.current?.getBoundingClientRect().bottom ?? 0) + window.scrollY,
                                left: (dropdownRef?.current?.getBoundingClientRect().left ?? 0) + window.scrollX,
                                width: dropdownRef?.current?.getBoundingClientRect().width
                            }}
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: Option<T>) => (
                                    <li className={style['custom-dropdown-option']} key={String(option[useFieldAs.id])}>
                                        <button
                                            type='button'
                                            name={name}
                                            className={style['custom-dropdown-option-button'] + " " + style['overflow-ellipsis']}
                                            onClick={() => {
                                                onChange?.(option);
                                                setSearchTerm("");
                                                toggleDropdown();
                                            }}
                                        >
                                            {String(option[useFieldAs.label])}
                                        </button>
                                        <div className={style['custom-dropdown-option-actions']}>
                                            {onhandleDelete && <button className={style['custom-dropdown-delete-button']} onClick={() => onhandleDelete?.(String(option[useFieldAs.id]))}>
                                                <Icon icon="solar:trash-bin-trash-line-duotone" className={style['custom-dropdown-icon']} />
                                            </button>}
                                            {onhandleUpdate && <button className={style['custom-dropdown-edit-button']} onClick={() => handleEdit?.(option)}>
                                                <Icon icon="solar:pen-2-line-duotone" className={style['custom-dropdown-icon']} />
                                            </button>}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className={style["custom-dropdown-no-options"]}>No options found.</li>
                            )}
                            {onhandleAdd && (
                                <li className={style['custom-dropdown-add-field']}>
                                    <div role='button' className={style['custom-dropdown-add-button']} onClick={() => { setModalOpen(true); setEditOption({}) }}>
                                        <Icon icon="solar:add-square-bold-duotone" className='custom-dropdown-icon' /> Add Field
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                    ,
                    document.body
                )
            )}
            <div ref={modalRef}>

                <Modal
                    open={modalOpen}
                    onClose={setModalOpen}
                >
                    <HeaderContent>
                        {editOption?.[useFieldAs.id] ? "Edit" : "Add"}
                    </HeaderContent>

                    <BodyContent>
                        {ObjConfig.map((data, index) => {

                            let labelValue = data.label ? data.label : data.id

                            if (data.id === useFieldAs.id) return null;
                            return <div className={style.customDropdown} key={data.id + index}>
                                {data.type === "string" && (
                                    <>
                                        <label className={`${style["custom-dropdown-label"]} ${required ? 'required' : ''}`} htmlFor={name + index}>
                                            {labelValue}
                                        </label>
                                        <input placeholder={`Enter ${labelValue}`} className={`${style["custom-Input-field"]} ${style["custom-dropdown-input-container"]}`} name={data.id} value={String(editOption?.[data.id] || "")} onChange={handleChange} type="text" id={name + index} />
                                    </>
                                )}
                                {data.type === "boolean" && (
                                    <div className={style["custom-Input-CheckBox"]}>
                                        <label className={`${style["custom-dropdown-label"]} ${required ? 'required' : ''}`} htmlFor={name + index}>
                                            {labelValue}
                                        </label>
                                        <input placeholder={`Enter ${labelValue}`} name={data.id} checked={Boolean(editOption?.[data.id] || false)} onChange={handleChange} type="checkbox" id={name + index} />
                                    </div>
                                )}
                                {data.type === "number" && (
                                    <>
                                        <label className={`${style["custom-dropdown-label"]} ${required ? 'required' : ''}`} htmlFor={name + index}>
                                            {labelValue}
                                        </label>
                                        <input placeholder={`Enter ${labelValue}`} className={`${style["custom-Input-field"]} ${style["custom-dropdown-input-container"]}`} name={data.id} value={Number(editOption?.[data.id])} onChange={handleChange} type="number" id={name + index} />
                                    </>
                                )}
                            </div>
                        })}
                    </BodyContent>

                    <FooterContent>
                        <Button
                            variant='text'
                            onClick={() => setModalOpen(false)} >
                            Cancel
                        </Button>
                        <Button
                            type='button'
                            onClick={() => editOption?.[useFieldAs.id] ? setModalOpen(!onhandleUpdate?.(editOption)) : setModalOpen(!onhandleAdd?.(editOption))}
                        >
                            Submit
                        </Button>
                    </FooterContent>
                </Modal>


            </div>
        </div>
    );
};

let CustomActionDropdown = memo(CustomActionSelect);

//////////////////////////////////////////////////////////////////////////////////////
interface DropProps<T extends ObjConfigType> {
    onChange?: (value: Option<T> | null) => void | null;
    value?: Option<T> | null;
    options?: Array<Option<T>>;
    className?: string;
    name?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    isClearable?: boolean;
}

const Dropdowns = <T extends ObjConfigType>({
    onChange,
    value = null,
    options = [],
    className = '',
    name = '',
    required = false,
    label,
    placeholder = "",
    disabled = false,
    isClearable = false
}: DropProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                optionRef.current &&
                !optionRef?.current.contains(event.target as Node)

            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = useCallback(() => setOpen(prevOpen => !prevOpen), []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value), []);

    const placeholderText = value?.label ? String(value.label) : placeholder;


    const filteredOptions = Array.isArray(options) ? options?.filter(option => String(option.label)?.toLowerCase().includes(searchTerm.toLowerCase())) : options;



    return (
        <div ref={dropdownRef} className={`${style.customDropdown} ${className}`}>
            {label && (
                <label className={`${style["custom-dropdown-label"]} ${required ? 'required' : ''}`} htmlFor={name}>
                    {label}
                </label>
            )}
            <div className={style["custom-dropdown-input-container"]}>
                <input
                    type="text"
                    value={searchTerm}
                    disabled={disabled}
                    placeholder={String(placeholderText)}
                    onChange={handleInputChange}
                    onClick={() => setOpen(true)}
                    className={`${style["custom-dropdown-input"]} ${value?.label && style["placeholder-active"]} ${style["overflow-ellipsis"]}`}
                /> <span style={{ color: "var(--border)" }}>|</span>
                {isClearable && (
                    <Icon aria-disabled={!value?.label} onClick={() => { onChange?.(null) }} icon="charm:cross" className={style['custom-dropdown-icon-cross']} />
                )}
                <Icon icon={`mingcute:${!open ? "down" : "up"}-line`} className={style['custom-dropdown-icon-arrow']} />
            </div>
            {open && (
                createPortal(
                    <div ref={optionRef}>
                        <ul
                            className={style['custom-dropdown-menu']}
                            style={{
                                position: 'absolute',
                                zIndex: 1300,
                                top: (dropdownRef?.current?.getBoundingClientRect().bottom ?? 0) + window.scrollY,
                                left: (dropdownRef?.current?.getBoundingClientRect().left ?? 0) + window.scrollX,
                                width: dropdownRef?.current?.getBoundingClientRect().width
                            }}
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: Option<T>) => (
                                    <li className={style['custom-dropdown-option']} key={String(option.label)}>
                                        <button
                                            type='button'
                                            name={name}
                                            className={style['custom-dropdown-option-button'] + " " + style['overflow-ellipsis']}
                                            onClick={() => {
                                                onChange?.(option);
                                                setSearchTerm("");
                                                toggleDropdown();
                                            }}
                                        >
                                            {String(option.label)}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className={style["custom-dropdown-no-options"]}>No options found.</li>
                            )}
                        </ul>
                    </div>
                    ,
                    document.body
                )
            )}
        </div>
    );
};

let Dropdown = memo(Dropdowns);

export { CustomActionDropdown, Dropdown };
