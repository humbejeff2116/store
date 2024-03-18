import { TextInput } from "@/components/forms/formik/components";
import FormTemplate from "../template/form"
import styles from './index.module.css';



interface TransferProps {
    handleTransferFunds: (values: any) => Promise<void> | void
}

export default function Transfer({
    handleTransferFunds
}: TransferProps) {

    return (
        <div className={styles.container}>
            <FormTemplate
            initialValues = {{
                amount: '',
            }}
            validationSchemaObj = {{
                // amount: Yup.string().required('Required'),
            }}
            handleSubmit={handleTransferFunds}
            buttonText='Transfer'
            >
                <TextInput
                label="Amount"
                labelWrapperClassName={styles.labelWrapper}
                name="amount"
                type="text"
                inputClassName={styles.input}
                inputWrapperClassName={styles.inputWrapper}
                inputNotEmptyClassName={styles.inputContains}
                inputErrorClassName={styles.inputError}
                errorClass={styles.inputErrorReport}
                /> 
            </FormTemplate>
        </div>
    )
}