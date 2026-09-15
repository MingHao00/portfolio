import type { Metadata } from 'next'
import { Noto_Sans_SC, Press_Start_2P } from 'next/font/google'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import './globals.css'

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio site',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSansSc.variable} ${pressStart2P.variable}`}>
      <body className={notoSansSc.className}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
