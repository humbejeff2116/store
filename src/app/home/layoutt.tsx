import '../global.css';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/components/layout/fashionStore';

const inter = Inter({ subsets: ['latin'] })

export default function HomeLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}