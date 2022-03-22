import Head from 'next/head'
import React from 'react'
import Script from 'next/script'

const Layout = ({ children } : { children: React.ReactNode }) => (
    <>
        <Script id='google-tag-script' strategy='lazyOnload' src='https://www.googletagmanager.com/gtag/js?id=G-SKYJYK1HCX'></Script>
        <Script id='google-analytics-script' strategy='lazyOnload'>
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());
                gtag('config', 'G-SKYJYK1HCX');
            `}
        </Script>
        <Head>
            <title>Píxeles sin contexto</title>
            <meta name='description' content='Mis opiniones y pensamientos' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
            {children}
        </main>
    </>
)

export default Layout