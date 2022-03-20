import Head from 'next/head'
import React from 'react'

const Layout = ({ children } : { children: React.ReactNode }) => (
    <>
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