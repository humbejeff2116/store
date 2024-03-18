import React, { useMemo, useState } from 'react';
import { IconContext } from "react-icons";
import useProductsNavContext from '@/context/productsNav/context';
import { FormTemplate1, SelectOption } from '@/components/forms/formik';
// import linksService, { SubLink } from '@/data/header/products';
import { SpinnerSmall } from '@/components/loader/spinner';
import DropDown from '../dropDown';
import styles from './index.module.css';
import { ProductNavSelect, Select } from '@/components/forms/formik/components';
import { DivEvent } from '@/components/types/events';
import { Form } from '@/data/header/products';

interface MainLinksProps {
    mainLinksForm: Form | null
    subLinkComp: React.ReactNode
}
export default function ProductsLinks({
    mainLinksForm,
    subLinkComp
}: MainLinksProps) {

    return (
        <div className={styles.container}>
        {mainLinksForm && (
            <>
            <div className={styles.left}>
                <FormTemplate1 {...mainLinksForm} handleSubmit={f => f}>
                {mainLinksForm.formData.map(input => 
                    <ProductNavSelect
                    key={input.id}
                    {...input}
                    inputClassName={styles.input}
                    inputErrorClassName={styles.inputError}
                    inputNotEmptyClassName={styles.inputContains}
                    >
                    {input.options && input.options.map(value =>
                        <SelectOption key={value.id} {...value}/>
                    )}
                    </ProductNavSelect>
                )}   
                </FormTemplate1>
            </div>
            <div className={styles.right}>
                {subLinkComp}
            </div>
            </>
        )}
        </div>
    )
}


interface SubLinkProps {
    icon?: React.ReactElement | JSX.Element
    name: string
    value?: string
    openDropdown: (e: DivEvent, name: string) => void
}

export function SubLink({
    icon,
    name,
    value,
    openDropdown
}: SubLinkProps) {

    return (
        <div 
        className={styles.subLink}
        onMouseEnter={(e) => openDropdown(e, name ?? value)}
        >
        {icon && (
            <IconContext.Provider value={{className: styles.icon}}>
                {icon}
            </IconContext.Provider>
        )}
        {name ?? value}
        </div>
    )
}