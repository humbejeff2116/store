import './global.css';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/components/layout/fashionStore';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MainLayout>
                    {children}
                </MainLayout>
            </body>
        </html>
    )
}
