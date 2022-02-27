import Head from 'next/head'
import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children } : { children: React.ReactNode }) => (
    <>
        <Head>
            <title>Oscar Sandoval</title>
            <meta name="description" content="Mis opiniones y pensamientos" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            {children}
        </main>
    </>
)

export default Layout