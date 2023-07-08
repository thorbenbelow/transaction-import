import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import NavBar from "@/components/NavBar";
import Theme from "@/app/theme";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Transaction import',
    description: 'Visualize spending habits',
}




export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NavBar/>
        <Theme>{children}</Theme>
        </body>
        </html>
    )
}
