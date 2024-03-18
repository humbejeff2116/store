import React from "react";
import styles from './index.module.css';
import { TextInput } from "@/components/forms/formik/components";
import FormTemplate from "../template/form";



interface EmailVerificationProps {
    emailVerified: boolean
    handleEmailVerification: (values: any) => Promise<void> | void
    userEmail?: string
    resendVerificationCode: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
}

export function EmailVerification({
    emailVerified,
    handleEmailVerification,
    userEmail,
    resendVerificationCode,
    children
}: EmailVerificationProps) {
    return (
        <>
        {emailVerified ? (
            children
        ) : (
            <>
            <FormTemplate
            initialValues = {{
                code: '',
            }}
            validationSchemaObj = {{
                // code: Yup.string().required('Required')
            }}
            handleSubmit={handleEmailVerification}
            buttonText='Continue'
            >
                <div className={styles.emailVerificationMessage}>
                    A verification code was sent to <span>
                        {/* <a href="httgmail.com"> */}
                        {userEmail ?? "johndoe@gmail.com"}
                        {/* </a> */}
                    </span>
                </div>
                <TextInput
                label="Please enter verification code"
                labelWrapperClassName={styles.labelWrapper}
                name="code"
                type="text"
                inputClassName={styles.input}
                inputWrapperClassName={styles.inputWrapper}
                inputNotEmptyClassName={styles.inputContains}
                inputErrorClassName={styles.inputError}
                errorClass={styles.inputErrorReport}
                placeholder="H-xxxxxx"
                /> 
                <div className={styles.resendWrapper}>
                    Did&apos;nt get code ? 
                    <button type="button" onClick={resendVerificationCode}>
                        Resend
                    </button>
                </div>
            </FormTemplate>
            </>
        )}
        </>
    )
}