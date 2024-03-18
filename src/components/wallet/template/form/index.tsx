import { Form, Formik } from "formik"
import styles from './index.module.css';


interface FormTemplateProps {
    handleSubmit: (values: any) => void | Promise<void>
    initialValues: Object
    validationSchemaObj: any //Yup.ObjectShape
    buttonText: string
    children: React.ReactNode
}

export default function FormTemplate({
    handleSubmit,
    initialValues,
    validationSchemaObj,
    buttonText,
    children
}: FormTemplateProps ) {
    return (
        <FormWrapper>
            <Formik
            initialValues = {initialValues}
            validationSchema = {{}
                // Yup.object(validationSchemaObj)
            }
            onSubmit = {handleSubmit}
            >
                <Form>
                <div>
                    {children}
                </div>
                <div className={styles.passwordButtonWrapper}>
                    <button  className={styles.passwordButton} type="submit">
                        {buttonText}
                    </button>
                </div>
                </Form>
            </Formik>
        </FormWrapper>
    )
}


interface FormWrapperProps {
    children: React.ReactNode
}
export function FormWrapper({
    children
}: FormWrapperProps) {
    return (
        <div className={styles.userVerificationContainer}>
            <div className={styles.userVerificationChild}>
                <div className={styles.userVerificationFormWrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
}