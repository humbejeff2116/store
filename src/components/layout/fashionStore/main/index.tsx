'use client'
import React from 'react';
import { AuthContextProvider } from '@/context/auth/provider';
import Header from '@/components/header';
import LeftSideBar from '@/components/leftsidebar';
// import Footer from '@/components/footer/tall';
import { ChildrenTemplate } from '../children';
import styles from './index.module.css';
import Footer from '@/components/footer/flat';
import MobileHeader from '@/components/mobileHeader';
import { NavContextProvider } from '@/context/navigation/provider';
import { SidebarContextProvider } from '@/context/sideBar/provider';
import { ProductsContextProvider } from '@/context/products/provider';
import { ProductsNavContextProvider } from '@/context/productsNav/provider';
import { CartContextProvider } from '@/context/cart/provider';


export interface TemplateProps {
    leftSideBarTop?: React.ReactElement, 
    leftSideBarBottom?: React.ReactElement, 
    leftSideBarMiddle?: React.ReactElement,
    children: React.ReactNode, 
    showFooter?: boolean
}

export default function MainLayout({ 
    leftSideBarTop, 
    leftSideBarMiddle,
    leftSideBarBottom, 
    children, 
    showFooter
}: TemplateProps) {
    return (
        <>
        <AuthContextProvider>
        <NavContextProvider>
        <SidebarContextProvider>
        <ProductsNavContextProvider>
        <ProductsContextProvider>
        <CartContextProvider>
            <div className={styles.container}>
                <div className={styles.left}>
                    <LeftSideBar/>
                </div>
                <div className={styles.right}>
                    <Header/>
                    {/* <MobileHeader/> */}
                    <ChildrenTemplate>
                    {children}
                    {showFooter && (
                        <Footer/>
                    )}
                    </ChildrenTemplate>
                </div>
            </div>
        </CartContextProvider>
        </ProductsContextProvider>
        </ProductsNavContextProvider>
        </SidebarContextProvider>
        </NavContextProvider>
        </AuthContextProvider>
        </>
    )
}