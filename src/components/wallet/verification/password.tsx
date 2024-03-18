import styles from './index.module.css';
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { PasswordInput, TextInput } from "@/components/forms/formik/components";
import FormTemplate from '../template/form';
import { EmailVerification } from './email';


interface PasswordAndEmailVerificationProps {
    usedFor: string
    passwordVerified: boolean
    emailVerified: boolean
    children: React.ReactNode
    handlePasswordVerification: (values: any) => Promise<void> | void
    handleEmailVerification: (values: any) => Promise<void> | void
    resendVerificationCode: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function PasswordAndEmailVerification({
    passwordVerified,
    emailVerified,
    handleEmailVerification,
    handlePasswordVerification,
    resendVerificationCode,
    children,
    usedFor
}: PasswordAndEmailVerificationProps) {
    return (
        <>
         {passwordVerified ? (
            <EmailVerification 
            emailVerified={emailVerified} 
            handleEmailVerification={handleEmailVerification} 
            resendVerificationCode={resendVerificationCode} 
            >
                {children}
            </EmailVerification>
        ) : (
            <FormTemplate
            initialValues = {{
                password: '',
            }}
            validationSchemaObj = {{
                // password: Yup.string().required('Required'),
            }}
            handleSubmit={handlePasswordVerification}
            buttonText='Confirm'
            >
                    <div className={styles.passwordConfirmText}>
                        Please confirm your password to {usedFor.toLowerCase()} your funds.
                    </div>
                    <PasswordInput
                    label="Please enter your password"
                    labelWrapperClassName={styles.labelWrapper}
                    name="password"
                    type="password"
                    inputClassName={styles.input}
                    inputWrapperClassName={styles.inputWrapper}
                    inputNotEmptyClassName={styles.inputContains}
                    inputErrorClassName={styles.inputError}
                    errorClass={styles.inputErrorReport}
                    /> 
            </FormTemplate>
        )}
        </>
    )
}