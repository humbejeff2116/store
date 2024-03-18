import _Landing from '@/components/_landing'
import { Metadata } from 'next'
import Image from 'next/image'


export const metadata: Metadata = {
    title: 'Afro Store',
    description: 'Buy and sell products',
}

export default function LandinPage() {
    return (
        <main>
            <_Landing/>
        </main>
    )
}
