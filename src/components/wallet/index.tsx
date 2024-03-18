'use client'
import React, { useEffect, useState } from 'react';
import walletHTTPService from '@/services/wallet';
import FundsTab, { tabs } from './tab';
import Transactions from './transactions';
import styles from './index.module.css';
import fundsService from '@/lib/funds';
import { Timer } from '@/components/types';
import transactionService from '@/services/transactions';
import { SessionStotrage } from '@/lib';
import useAuth from '@/context/auth/context';
import { ModalBox } from '../modal/centerModals';
import ModalChild from './modalChild';
import ModalTab from './modalTab';
import TransactionTemplate from './template/transaction';
import  PasswordAndEmailVerification  from './verification/password';
import { EmailVerification } from './verification/email';
import Transfer from './transfer';
import Withdraw from './withdraw';
import Funds from './funds';


interface Wallet {
    id: string
    userId: string
    totalFunds: number
}

export const transactions = {
    deposit: 'deposit',
    withdraw: 'withdraw',
    transfer: 'transfer'
}
export default function Wallet() {
    const [activeTab, setActiveTab] = useState(tabs.funds);
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState(transactions.deposit)
    const [passwordAuthentic, setPasswordAuthentic] = useState(false);
    const [emailAuthentic, setEmailAuthentic] = useState(false);
    const [walletId, setWalletId] = useState("677iou");
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState<number | null>(20_780);
    const { user } = useAuth();
    let timer: Timer = null;

    useEffect(() => {
        if (user) {
            // getUserFunds(user._id);
        }
    }, [user]);

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [timer]);

    const getUserFunds = async (userId: string) => {
        setLoading(true);
        try {
            const { error, message, data } = await walletHTTPService.getUserWallet(userId);
            const { amount, _id } = data;
            if (error) {
                setError(true);
                setMessage(message);
                return;
            }
            setAmount(amount);
            setWalletId(_id)
        } catch (err) {
            // TODO... handle error
        } finally {
            setLoading(false); 
        }
    }

    const handleSetTab = (tabName: string) => {
        setActiveTab(tabName);
    }

    const closeModal = () => {
        setShowModalChild(false);

        timer = setTimeout(() => {
            setShowModal(false);
        }, 800);
    }

    const handleShowModal = (transactionType: string) => {
        setActiveModalTab(transactionType);
        if(!showModal) {
            setShowModal(true);
        }
        
        timer = setTimeout(() => {
            setShowModalChild(true);
        });
    }

    // collect user password and verify with user backend password
    // generate code and send to user email
    const handlePasswordVerification = async (values: any) => {
        try {
            // const authPasswordResponse = await transactionService.authenticateUserPassword({userId: user.id, password: values.password}),

            // Session.set(`${user.id}-transaction`, authPasswordResponse.transactionCookie);
            // if (authPasswordResponse.status === 200) {
            //     Session.set(`${user.id}-transaction`, authPasswordResponse.transactionCookie);
            //     setPasswordAuthentic(true);
            // }
            setPasswordAuthentic(true);
        } catch(err) {
            throw err;
        }
    }

    const handleEmailVerification = async (values: any) => {
        try {
            // Session.set(`${user.id}-enteredCode`, values.code);
            // const transactionCookie = Session.getParse(`${user.id}-transaction`);
            // if (!transactionCookie) {
            //     return;
            // }

            // const authEmailResponse = await transactionService.authenticateEmailVerificationCode({userId: user?.id, transactionId: transactionCookie.id, code: values.code});
            // if (authEmailResponse.pass) {
            //     Session.set(`${user.id}-transaction`, authEmailResponse.transactionCookie);
            //     setEmailAuthentic(true);
            // } 
            setEmailAuthentic(true); 
        } catch (error) {
            
        }
    }

    const resendVerificationCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("clicked");
        if (!user) return;
        const response = await transactionService.generateVerificationCode(user._id);
    }

    /**
     * used to verify code sent to user email and
     * if correct initiate transfer
     * @param values = { values.code }
     * @returns 
    */
    const handleTransfer = async (values: any) => {
        if (!user) {
            return;
        }
        
        const userId = user._id;
        const transactionCookie = SessionStotrage.getParse(`${userId}-transaction`);

        if (!transactionCookie) {
            return;
        }
        const parseTransactionCookie = JSON.parse(transactionCookie);

        alert(`transfer from: ${userId}, walletId:${walletId}, transferAmount:${values.amount}`);

        try {
            const transferResponse = await fundsService.transfer(transactionCookie, userId, values.amount);  
        } catch (error) {
            
        }
    }

    /**
     * used to verify code sent to user email and
     * if correct initiate withdraw
     * @param values = { values.code }
     * @returns 
     */
    const handleWithdraw = async (values: any) => {
        if (!user) {
            return;
        }

        const userId = user._id;
        const transactionCookie = SessionStotrage.getParse(`${userId}-transaction`);

        if (!transactionCookie) {
            return;
        }

        if (!wallet) {
            return;
        }

        try {
            const isValidWithdrawAmount = await fundsService.validWithdrawAmount(Number(values.amount), wallet.totalFunds)
            const withdrawResponse = await fundsService.withdraw(transactionCookie, userId, values.amount);  
        } catch (error) {
            
        }
    }

    const handleSelectWithdrawMethods = () => {

    }

    return (
        <div className={styles.container}>
            {showModal && (
                <ModalBox 
                dontUseDefaultModalChildContainer
                handleModal={closeModal}
                >
                    <ModalChild show={showModalChild}>
                        <ModalTab 
                        setActiveTab={setActiveModalTab}
                        activeTab={activeModalTab}
                        headingText={
                            activeModalTab === transactions.transfer ? 
                            "Transfer" : 
                            activeModalTab === transactions.withdraw ? 
                            "Withdraw" : "Deposit"
                        }                        
                        />
                        {activeModalTab === transactions.transfer ? (
                            <TransactionTemplate
                                userName={'John Doe'}
                                userId='sdsdsd' 
                                walletId={walletId} 
                                amount={amount}                            
                                >
                                <PasswordAndEmailVerification 
                                usedFor='Transfer'
                                passwordVerified={passwordAuthentic}
                                handlePasswordVerification={handlePasswordVerification} 
                                emailVerified={emailAuthentic} 
                                handleEmailVerification={handleEmailVerification} 
                                resendVerificationCode={resendVerificationCode} 
                                >
                                    <Transfer handleTransferFunds={handleTransfer}/>
                                </PasswordAndEmailVerification>
                            </TransactionTemplate>
                        ) : activeModalTab === transactions.withdraw ? (
                            <TransactionTemplate
                            userName={'John Doe'}
                            userId='sdsdsd'
                            walletId={walletId} 
                            amount={amount}
                            >
                                <PasswordAndEmailVerification 
                                usedFor='Withdraw' 
                                passwordVerified={passwordAuthentic} 
                                handlePasswordVerification={handlePasswordVerification}
                                emailVerified={emailAuthentic} 
                                handleEmailVerification={handleEmailVerification} 
                                resendVerificationCode={resendVerificationCode}
                                >
                                    <Withdraw 
                                    handleSelectWithdrawMethod={handleSelectWithdrawMethods}
                                    handleWithdrawFunds={handleWithdraw}
                                    />
                                </PasswordAndEmailVerification>
                            </TransactionTemplate>
                        ) : (
                            <TransactionTemplate
                            userName={'John Doe'}
                            userId='sdsdsd'
                            walletId={walletId} 
                            amount={amount}
                            >
                                <PasswordAndEmailVerification 
                                usedFor='Deposit' 
                                passwordVerified={passwordAuthentic} 
                                handlePasswordVerification={handlePasswordVerification}
                                emailVerified={emailAuthentic} 
                                handleEmailVerification={handleEmailVerification} 
                                resendVerificationCode={resendVerificationCode}
                                >
                                    {/* TODO... return deposit UI */}
                                    <Withdraw 
                                    handleSelectWithdrawMethod={handleSelectWithdrawMethods}
                                    handleWithdrawFunds={handleWithdraw}
                                    />
                                </PasswordAndEmailVerification>
                            </TransactionTemplate>  
                        )}
                    </ModalChild>
                </ModalBox>
            )}
            <FundsTab 
            handleSetTab={handleSetTab} 
            activeTab={activeTab}            
            />
            <div className={styles.childWrapper}>
            {activeTab === tabs.transactions ? (
                <Transactions/>
            ) : (
                <Funds 
                handleShowModal={handleShowModal} 
                loading={loading} 
                error={error} 
                message={message} 
                walletId={walletId} 
                amount={amount || 84_464.88}                
                />
            )}
            </div>  
        </div>
    )
}