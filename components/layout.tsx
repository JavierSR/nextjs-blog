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
            <meta name='description' content='Mis opiniones y pensamientos. Variedad de artículos, la mayoría sin mucho sentido.' />
            <meta name='keywords' content='blog, opinión, tecnología, life style'/>
            <meta name='author' content='Oscar Sandoval'/>
            <meta property='og:title' content='Píxeles sin contexto' />
            <meta property='og:description' content='Mis opiniones y pensamientos. Variedad de artículos, la mayoría sin mucho sentido.' />
            <meta property='og:type' content='website' />
            <meta property='og:locale' content='es_MX' />
            <meta property='og:image' content='../public/og_img.png' />
            <meta property='og:url' content='https://pixelessincontexto.com' />
            <link rel='canonical' href='https://pixelessincontexto.com' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>
            {children}
        </main>
    </>
)

export default Layout