import Head from 'next/head'
import React from 'react'
import Script from 'next/script'
import Header from './header/Header'
import GeneralInfo from  '../models/generalInfo.model'
import { Context } from '../contexts/deviceContext'
import { useEffect, useContext } from 'react'

const domain = 'https://pixelessincontexto.com'

declare interface LayoutProps {
    children: React.ReactNode
    generalInfo: GeneralInfo
    title?: string
    keywords?: string
    description?: string
    image?: string
    slug?: string
}

const Layout = (props : LayoutProps) => {
    const title = props.title || 'Píxeles sin contexto'
    const description = props.description || 'Mis opiniones y pensamientos. Variedad de artículos, la mayoría sin mucho sentido.'
    const keywords = props.keywords || 'blog, opinión, tecnología, life style'
    const image = props.image || `${domain}/og_img.png`
    const url = props.slug ? `${domain}/post/${props.slug}` : domain

    const { dispatch } = useContext(Context)

    const handleResize = () => {
        const isDesktopSize = window.screen.width > 560
        dispatch({
            type: 'setIsDesktop',
            value: isDesktopSize
        })
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            handleResize()
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
    return (
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
                <title>{title || 'Píxeles sin contexto'}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords}/>
                <meta name='author' content='Oscar Sandoval'/>
                <meta property='og:title' content={title || 'Píxeles sin contexto'} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content={props.title ? 'article' : 'website'} />
                <meta property='og:locale' content='es_MX' />
                <meta property='og:image' content={image} />
                <meta property='og:url' content={url} />
                <link rel='canonical' href={url} />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Header generalInfo={props.generalInfo}/>
                {props.children}
            </main>
        </>
    )
}

export default Layout