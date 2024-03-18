import React, { ComponentProps, ComponentPropsWithoutRef, forwardRef, useEffect } from 'react';
import { useField } from 'formik';
import { BsExclamationCircle } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import useProductsNavContext from '@/context/productsNav/context';
import { ActiveLink } from '@/data/header/products';
import useProductsContext from '@/context/products/context';
// import styles from './formik.module.css';

// TODO... rename errorClass to errorDisplayClass
interface TextInputProps extends ComponentProps<"input"> {
    label?: string 
    labelText?: string
    id?: string
    name: string
    type: string 
    inputWrapperClassName?: string
    inputClassName?: string
    inputErrorClassName?: string
    inputNotEmptyClassName?: string
    labelTextClass?: string 
    errorClass?: string 
    labelWrapperClassName?: string
    dontShowErrorText?: boolean
    useOnlyTextInput?: boolean
    placeholder?: string 
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ 
    label, 
    errorClass,
    inputWrapperClassName,
    inputClassName,
    inputErrorClassName,
    inputNotEmptyClassName, 
    labelWrapperClassName,
    dontShowErrorText,
    useOnlyTextInput, 
    ...props 
}, ref) => {
    const [field, meta] = useField(props);

    const textInputClassName = (
        (meta.value && !meta.error) ? `${inputClassName} ${inputNotEmptyClassName || "not-empty"}` : 
        (meta.touched && meta.error) ? `${inputClassName} ${inputErrorClassName || "has-error"}` :
        inputClassName
    )

    if (useOnlyTextInput) {
        return (
            <div className={inputWrapperClassName}>
                <input className = { textInputClassName } { ...field } { ...props } ref = { ref }/>
                {(meta.touched && meta.error) && (
                    <IconContext.Provider value={{className: 'error-icon'}}>
                        <BsExclamationCircle/>
                    </IconContext.Provider>
                )}
            </div>
        )
    }

    return (
       <>
            {label && (
                <div className = { labelWrapperClassName }>
                    <label htmlFor = { props.id ?? props.name }>
                    { label }
                    </label>
                </div>
            )}       
            <div className={inputWrapperClassName}>
                <input className = { textInputClassName } { ...field } { ...props } ref = { ref }/>
                {/* {(meta.touched && meta.error) && (
                    <IconContext.Provider value={{className: 'error-icon'}}>
                        <BsExclamationCircle/>
                    </IconContext.Provider> 
                )} */}
            </div>
            <div className = { errorClass }>
            {dontShowErrorText ? "" : (meta.touched && meta.error) && (
                <>
                <IconContext.Provider value={{className: 'error-icon'}}>
                    <BsExclamationCircle/>
                </IconContext.Provider>
                <span>{ meta.error }</span>
                </>
            )}
            </div>
        </>
    )
})
TextInput.displayName = "Search";


interface TextAreaInputprops extends ComponentProps<"textarea"> {
    label?: string 
    id?: string
    name: string
    type: string 
    errorClass?: string 
    inputClassName?: string
    inputErrorClassName?: string
    inputNotEmptyClassName?: string
    labelWrapperClassName?: string 
    dontShowErrorText?: boolean
    useOnlyTextArea?: boolean
}
export const TextAreaInput = ({ 
    label, 
    errorClass, 
    inputClassName,
    inputErrorClassName,
    inputNotEmptyClassName,
    labelWrapperClassName, 
    dontShowErrorText,
    useOnlyTextArea,
    ...props 
}: TextAreaInputprops) => {
    const [field, meta] = useField(props);

    const textAreaClassName = (
        (meta.value && !meta.error) ? `${inputClassName} ${inputNotEmptyClassName}` : 
        (meta.touched && meta.error) ? `${inputClassName} ${inputErrorClassName}` :
        inputClassName
    )

    if (useOnlyTextArea) {
        return (
            <textarea className = { textAreaClassName } { ...field } { ...props } />
        )
    }
  
    return (
        <>
            <div className={labelWrapperClassName}>
                <label htmlFor={props.id ?? props.name}>
                {label}
                </label>
            </div>
            <textarea className={textAreaClassName} { ...field } { ...props }/>
            <div className = { errorClass }>
            {dontShowErrorText ? "" : (meta.touched && meta.error) && (
                <>
                <IconContext.Provider value={{className: 'error-icon'}}>
                    <BsExclamationCircle/>
                </IconContext.Provider>
                <span>{ meta.error }</span>
                </>
            )}
            </div>
        </>
    )
}

interface ErrorTextProps {
    meta: any
}
function ErrorText({ 
    meta 
}: ErrorTextProps) {
    return (
        <>
        {(meta.touched && meta.error) && (
            <span>{ meta.error }</span>
        )}
        </>
    )
}


interface PasswordInputProps extends ComponentPropsWithoutRef<"input"> {
    label?: string 
    id?: string
    name: string 
    type: string
    labelWrapperClassName?: string 
    inputWrapperClassName?: string
    inputNotEmptyClassName?: string
    inputErrorClassName?: string
    inputClassName?: string
    errorClass?: string  
    dontShowErrorText?: boolean 
}
export const PasswordInput = ({ 
    label, 
    labelWrapperClassName,
    inputWrapperClassName,
    inputClassName,
    inputNotEmptyClassName,
    inputErrorClassName,
    errorClass,  
    dontShowErrorText, 
    // type,
    ...props 
}: PasswordInputProps) => {
    const [field, meta] = useField(props);

    const passwordInputClassName = (
        (meta.value && !meta.error) ? `${inputClassName} ${inputNotEmptyClassName || "not-empty"}` : 
        (meta.touched && meta.error) ? `${inputClassName} ${inputErrorClassName || "has-error"}` :
        inputClassName
    )
  
    return (
        <>
            <div className = { labelWrapperClassName || "" }>
                <label htmlFor = { props.id || props.name }>{ label }</label>
            </div>
            <div className={inputWrapperClassName}>
                <input className = { passwordInputClassName } { ...field } { ...props }/>
                {/* {(meta.error) && (
                    <IconContext.Provider value={{className: 'error-icon'}} >
                        <BsExclamationCircle/>
                    </IconContext.Provider>
                )} */}
            </div>
            <div className = { errorClass }>
            {dontShowErrorText ? "" : (meta.touched && meta.error) && (
                <>
                <IconContext.Provider value={{className: 'error-icon'}}>
                    <BsExclamationCircle/>
                </IconContext.Provider>
                <span>{ meta.error }</span>
                </>
            )}
            </div>
        </>
    )
}


interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
    id: string
    name: string 
    children: React.ReactNode 
    errorClass?: string 
    labelWrapperClassName?: string 
    dontShowErrorText: boolean
}
export const Checkbox = ({ 
    children, 
    errorClass, 
    labelWrapperClassName, 
    dontShowErrorText, 
    ...props 
}: CheckboxProps) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" { ...field } { ...props }/>
                { children }
            </label>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
            </div> 
        </div>
    )

}

interface SelectProps {
    id?: string
    name: string 
    label?: string 
    labelWrapperClassName?: string 
    errorClass?: string
    inputClassName?: string
    inputErrorClassName?: string 
    inputNotEmptyClassName?: string 
    dontShowErrorText?: boolean
    inputWrapperClassName?: string
    useOnlySelect?: boolean
    children: React.ReactNode
}

export const Select = ({
    label, 
    labelWrapperClassName, 
    errorClass,
    inputClassName,
    inputErrorClassName, 
    inputNotEmptyClassName, 
    dontShowErrorText,
    inputWrapperClassName,
    useOnlySelect,
    children,  
    ...props 
}: SelectProps) => {
    const [field, meta] = useField(props);

    const selectInputClassName = (
        (!meta.error && meta.value) ? `${inputClassName} ${inputNotEmptyClassName || "not-empty"}` : 
        (meta.touched && meta.error) ? `${inputClassName} ${inputErrorClassName || "has-error"}` :
        inputClassName
    )

    if (useOnlySelect) {
        return (
            <select className = {selectInputClassName} {...field} {...props}>
            {children}
            </select>
        )
    }

    return (
        <>
        <div className={labelWrapperClassName || ''}>
            <label htmlFor={props.id ?? props.name}>{label}</label>
        </div>
        <div className = {inputWrapperClassName}> 
            <select className = {selectInputClassName} {...field} {...props}>
            {children}
            </select>
        </div>
        <div className={errorClass}>
        {dontShowErrorText ? "" : <ErrorText meta={meta}/>}
        </div>
        </>
    )
}

export const ProductNavSelect = ({
    inputClassName,
    inputErrorClassName, 
    inputNotEmptyClassName, 
    children, 
    ...props 
}: SelectProps) => {
    const [field, meta] = useField(props);
    const { setActiveMainLink } = useProductsNavContext();
    const { setBeginProductsQuery } = useProductsContext();

    useEffect(() => {
        if (meta.value) {
            const activeLink: ActiveLink = {
                name: meta.value
            }
            setActiveMainLink(activeLink);
            setBeginProductsQuery(true);
        }
    }, [meta.value]);

    const selectInputClassName = (
        `${inputClassName}  
        ${
            (!meta.error && meta.value) ? inputNotEmptyClassName || "not-empty" : 
            (meta.touched && meta.error) ? inputErrorClassName || "has-error" : ""
        }`
    )

    return (
        <select className = {selectInputClassName} {...field} {...props}>
        {children}
        </select>
    )
}

//  file input inspired by https://codepen.io/softopia/pen/LMmJLz
interface FileInputProps extends ComponentPropsWithoutRef<"input"> {
    label?: string
    name: string
    id: string
    icon: JSX.Element
    labelClassName: string
    numberofimages: number
    errorClass: string 
    labelSpanClassName: string
    inputClassName: string
    previewImagesButton: React.ReactNode 
}
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ 
    label,
    labelClassName, 
    numberofimages,
    errorClass, 
    labelSpanClassName,
    inputClassName,
    previewImagesButton, 
    ...props
}, ref) => {  
    return (
        <>
            <label className = { labelClassName }>
            {(numberofimages > 0) && (
                <span className="length">{ numberofimages }</span>
            )}
            <i>{ props.icon }</i>
            <span className = { labelSpanClassName }>
            { label }
            </span>
            <input className = { inputClassName || "image-input" } ref = { ref } { ...props }/>
            </label>
            <div className = { errorClass }>
            </div>
        </>
    )
})
FileInput.displayName = "FileInput"