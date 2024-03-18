import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select, PasswordInput, FileInput } from './components';
import { InputChangeEvent } from '@/components/types/events';
import { formInputType } from '@/components/types/form';
import styles from './formik.module.css';





type FormTemplate1Props = Pick<
    FormTemplateProps, 
    'initial' | 
    'yupValidation' | 
    'handleSubmit' | 
    'children'
>
export function FormTemplate1({
    initial,
    yupValidation,
    handleSubmit,
    children,
}: FormTemplate1Props) {
    return (
        <Formik
        initialValues = {initial}
        // validationSchema = {Yup.object(yupValidation)}
        onSubmit = {handleSubmit}
        >
            <Form>
            {children}
            </Form>
        </Formik>
    )
}

interface inputOptions {
    value: string
}

interface FormInputData {
    id?: string
    name: string
    type: string,
    label?: string,
    dontShowErrorText?: boolean
    options?: Array<inputOptions>
    placeholder?: string
}

interface FormTemplateProps {
    initial: object
    // yupValidation: Yup.ObjectShape
    yupValidation: any
    handleSubmit: (values: any, { setSubmitting }: {setSubmitting: (submitting: boolean) => void}) => void
    formData: Array<FormInputData>
    handleImageChange?: (e: InputChangeEvent) => void
    errorClassName?: string
    labelWrapperClassName?: string
    inputClassName?: string
    textAreaClassName?: string
    selectClassName?: string
    fileInputClassName?: string
    inputErrorClassName?: string
    inputNotEmptyClassName?: string
    inputRef?: React.Ref<HTMLInputElement>
    children: React.ReactNode
    // cachedInputsData: object
}

export default function FormTemplate({
    initial,
    yupValidation,
    handleSubmit,
    formData,
    handleImageChange,
    errorClassName,
    labelWrapperClassName,
    inputClassName,
    textAreaClassName,
    selectClassName,
    fileInputClassName,
    inputNotEmptyClassName,
    inputErrorClassName,
    inputRef,
    children,
    // cachedInputsData,
    ...props
}: FormTemplateProps) {
    const getInputClassName = (type: string) => {
        switch (type) {
            case (formInputType.text):
            case (formInputType.email):
            case (formInputType.date):
               return inputClassName;
            case (formInputType.textArea):
                return textAreaClassName;
            case (formInputType.select):
                return selectClassName;
            case (formInputType.file):
                return fileInputClassName;
            case (formInputType.password):
                return inputClassName;
            default:
                return inputClassName;
        }
    }
    return (
        <Formik
        initialValues = {initial}
        // validationSchema = {Yup.object(yupValidation)}
        onSubmit = {handleSubmit}
        >
            <Form>
            {formData.map((input, i) => 
                <FormInput 
                key={i} 
                {...input}
                labelWrapperClassName={labelWrapperClassName}
                inputClassName={getInputClassName(input.type)}
                inputErrorClassName={inputErrorClassName}
                inputNotEmptyClassName={inputNotEmptyClassName}
                inputRef = {inputRef}
                handleImageChange={handleImageChange}
                errorClassName={errorClassName}
                />
            )}
            {children}
            </Form>
        </Formik>
    )
}

interface FormInputProps {
    type: string
    handleImageChange: any
    inputRef?: React.Ref<HTMLInputElement>
    errorClassName?: string
    labelWrapperClassName?: string
    inputClassName?: string
    inputWrapperClassName?: string
    inputErrorClassName?: string
    inputNotEmptyClassName?: string
    dontShowErrorText?: boolean
    name: string
    label?: string
    placeholder?: string
    options?: Array<inputOptions>
}

export function FormInput({
    errorClassName,
    labelWrapperClassName,
    inputWrapperClassName,
    inputClassName,
    inputErrorClassName,
    inputNotEmptyClassName,
    dontShowErrorText,
    name,
    label,
    type,
    options,
    handleImageChange,
    inputRef,
    ...props
}: FormInputProps) {
    // alert(type)
    switch (type) {
        case (formInputType.text):
        case (formInputType.email):
        case (formInputType.date):
            return (
                <TextInput
                {...props}
                label={label}
                labelWrapperClassName={labelWrapperClassName || styles.formGroup}
                name={name}
                type={type}
                errorClass={errorClassName}
                inputWrapperClassName={inputWrapperClassName}
                inputClassName={inputClassName}
                inputErrorClassName={inputErrorClassName}
                inputNotEmptyClassName={inputNotEmptyClassName}
                dontShowErrorText={dontShowErrorText}
                ref = {inputRef}
                />
            )
        case (formInputType.textArea):
            return (
                <TextAreaInput
                {...props}
                label={label}
                labelWrapperClassName={labelWrapperClassName || styles.formGroup}
                name={name}
                type={type}
                errorClass={errorClassName}
                inputClassName={inputClassName}
                inputErrorClassName={inputErrorClassName}
                inputNotEmptyClassName={inputNotEmptyClassName}
                dontShowErrorText={dontShowErrorText}
                />
            )
        case (formInputType.select):
            return (
                <Select
                {...props}
                label={label}
                labelWrapperClassName={labelWrapperClassName || styles.formGroup}
                name={name}
                errorClass={errorClassName}
                inputClassName={inputClassName}
                inputErrorClassName={inputErrorClassName}
                inputNotEmptyClassName={inputNotEmptyClassName}
                dontShowErrorText={dontShowErrorText}
                >
                {options && (
                    options.map((value, i) =>
                        <SelectOption key={i} {...value} />
                    )
                )}
                </Select>
            )
        case (formInputType.file):
            return (
                <div className="course-reg-input-file">
                    <label htmlFor="passport">{label}</label>
                    <input type={type}  name={name} onChange={handleImageChange}/>
                </div>
            )

        case (formInputType.password):
                return (
                    <PasswordInput
                    {...props}
                    label={label}
                    labelWrapperClassName={labelWrapperClassName || styles.formGroup}
                    name={name}
                    type={type}
                    errorClass={errorClassName}
                    inputWrapperClassName={inputWrapperClassName}
                    inputClassName={inputClassName}
                    inputErrorClassName={inputErrorClassName}
                    inputNotEmptyClassName={inputNotEmptyClassName}
                    dontShowErrorText={dontShowErrorText}
                    // ref = {inputRef}
                    />
                )
        default:
            return null;
    }
}


interface OptionProps {
    name?: string
    value: string
}
export function SelectOption({
    name,
    value,
}: OptionProps) {
    return (
        <>
        {(value === "Select") ? (
            <option value="">
                {value}
            </option> 
        ) : (
            <option value={value}>
                {name ?? value}
            </option>  
        )}
        </>
    )
}

export const OP: React.FC<OptionProps> = ({
    value
}) => {
    return (
        <div>

        </div>
    )

}