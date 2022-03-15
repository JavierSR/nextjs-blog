import Image from 'next/image'
import { FC, useEffect, useState, useRef, RefObject } from 'react'
import Scrollbar from 'smooth-scrollbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import GeneralInfo from  '../../models/generalInfo.model'
import styles from '../../styles/Info.module.scss'
import Logo from '../../public/logo.png'
import ProfilePic from '../../public/me.jpeg'
import IgIcon from '../../public/ig.png'
import TwitterIcon from '../../public/twitter.png'
import LinkeInIcon from '../../public/linkedin.png'

declare interface ComponentProps {
    generalInfo: GeneralInfo
}

declare interface References {
    top: RefObject<HTMLElement>
    profile: RefObject<HTMLElement>
    description: RefObject<HTMLElement>
}

declare interface HeaderProps { 
    scrollTo: (props: RefObject<HTMLElement>) => void
    references: References
}

const HeaderComponent = ({ scrollTo, references } : HeaderProps ) => (
    <header className={styles.header}>
        <div className={styles.shadow}>
            <div className={styles.logo}>
                <a href='/'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        layout='fixed'
                    />
                </a>
            </div>
            <nav className={styles.nav}>
                <a onClick={() => scrollTo(references.top)}>Inicio</a>
                <a onClick={() => scrollTo(references.description)}>Este blog</a>
                <a onClick={() => scrollTo(references.profile)}>Sobre mi</a>
            </nav>
        </div>
        <div className={styles.shadow}>
            <Box className={styles.search}>
                <SearchIcon />
                <TextField label='Busqueda' variant='standard'/>
            </Box>
        </div>
    </header>
)

const Me = ({ generalInfo, reference } : { generalInfo: GeneralInfo, reference : RefObject<HTMLElement> }) => (
    <section className={styles.me} ref={reference}>
        <div className={styles.profile}>
            <Image
                src={ProfilePic}
                alt='Me'
                placeholder='blur'
                layout='fill'
            />
        </div>
        <div className={styles.ig}>
            <a href={generalInfo.ig} target='_blank'>
                <Image
                    src={IgIcon}
                    alt='Instagram'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.twitter}>
            <a href={generalInfo.twitter} target='_blank'>
                <Image
                    src={TwitterIcon}
                    alt='Twitter'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.linkedin}>
            <a href={generalInfo.linkedin} target='_blank'>
                <Image
                    src={LinkeInIcon}
                    alt='LinkedIn'
                    layout='fill'
                />
            </a>
        </div>
        <div className={`${styles['text-container']} ${styles.shadow}`}>
            <h2>Sobre mi</h2>
            <p>{generalInfo.bio}</p>
        </div>
    </section>
)

const Info: FC<ComponentProps> = ({ generalInfo }: ComponentProps) => {
    const [scroller, setScroller] = useState<null | Scrollbar>(null)
    const references: References = {
        top: useRef<HTMLElement>(null),
        profile: useRef<HTMLElement>(null),
        description: useRef<HTMLElement>(null),
    }

    const startScroller = (element: HTMLElement) => {
        const scrollOptions = {
            damping : 0.05,
        }
        setScroller(Scrollbar.init(element, scrollOptions))
    }
    
    useEffect(() => {
        const element = document.querySelector('#scrollable-content') as HTMLElement
        startScroller(element)
        return () => {
            if(scroller) {
                Scrollbar.destroy(element)
            }
        }
    }, [])

    const scrollTo = (element: RefObject<HTMLElement>) => {
        scroller?.scrollIntoView(element.current as HTMLElement, {
            offsetTop: 15
        })
    }
    
    return (
        <aside className={styles.info} id='scrollable-content'>
            <HeaderComponent scrollTo={scrollTo} references={references}/>
            <div ref={references.description as RefObject<HTMLDivElement>} className={styles.about}>
                <div className={styles.shadow}>
                    <h1>Píxeles sin contexto</h1>
                    <div dangerouslySetInnerHTML={{__html: generalInfo.description}}></div>
                </div>
            </div>
            <Me generalInfo={generalInfo} reference={references.profile}/>
        </aside>
    )
}

export default Info