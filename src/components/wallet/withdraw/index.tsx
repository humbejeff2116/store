import { IconContext } from 'react-icons';
import styles from './index.module.css';
import { RiCursorFill } from 'react-icons/ri';
import FormTemplate from '../template/form';
import { TextInput } from '@/components/forms/formik/components';






interface WithdrawProps {
    handleWithdrawFunds: (values: any) => Promise<void> | void
    handleSelectWithdrawMethod: () => void
}

export default function Withdraw({
    handleWithdrawFunds,
    handleSelectWithdrawMethod
}: WithdrawProps) {

    return (
        <div className={styles.container}>
            <FormTemplate
            initialValues = {{
                amount: '',
            }}
            validationSchemaObj = {{
                // amount: Yup.string().required('Required'),
            }}
            handleSubmit={handleWithdrawFunds}
            buttonText='Withdraw'
            >

                <TextInput
                label="Please enter withdraw amount"
                labelWrapperClassName={styles.labelWrapper}
                name="amount"
                type="text"
                inputClassName={`${styles.input} ${styles.amountInput}`}
                inputWrapperClassName={styles.inputWrapper}
                inputNotEmptyClassName={styles.inputContains}
                inputErrorClassName={styles.amountInputError}
                errorClass={styles.inputErrorReport}
                placeholder="0.00"
                /> 
                <div className={styles.walletInfoWrapper}>
                    <div className={styles.walletInfo}>
                        Wallet id: <span>harns-54545</span>
                    </div>
                    <div className={styles.walletInfo}>
                        Total funds: <span>NGN 400.00</span>
                    </div>
                </div>
                <div className={styles.withdrawMethods}>
                    <div className={styles.withdrawMethodsText}>
                        Select withdraw method
                    </div>
                    <button 
                    type="button"
                    onClick={handleSelectWithdrawMethod}>
                        <IconContext.Provider value={{className: styles.buttonIcon}}>
                            <RiCursorFill/>
                        </IconContext.Provider>
                    </button>
                </div>
                {/* <div className={styles.accountNumberInput}>
                    account number input
                </div> */}
            </FormTemplate>
        </div>
    )
}