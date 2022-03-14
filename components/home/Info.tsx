import Image from 'next/image'
import { FC, useEffect, useState, useRef, RefObject } from 'react'
import Scrollbar from 'smooth-scrollbar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import styles from '../../styles/Info.module.scss'
import Logo from '../../public/logo.png'
import ProfilePic from '../../public/me.jpeg'
import IgIcon from '../../public/ig.png'
import TwitterIcon from '../../public/twitter.png'
import LinkeInIcon from '../../public/linkedin.png'

const Me = ({ reference } : { reference : RefObject<HTMLElement> }) => (
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
            <a href='https://www.instagram.com/oscarjajavier/' target='_blank'>
                <Image
                    src={IgIcon}
                    alt='Instagram'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.twitter}>
            <a href='https://twitter.com/oj_45' target='_blank'>
                <Image
                    src={TwitterIcon}
                    alt='Twitter'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.linkedin}>
            <a href='https://www.linkedin.com/in/oscar-sandoval-5570981b1/' target='_blank'>
                <Image
                    src={LinkeInIcon}
                    alt='LinkedIn'
                    layout='fill'
                />
            </a>
        </div>
        <div className={`${styles['text-container']} ${styles.shadow}`}>
            <h2>Oscar Sandoval</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus culpa voluptas pariatur error ea provident repellat reprehenderit, amet illo autem blanditiis totam ipsam officiis, ipsum porro odit eum atque aut.</p>
        </div>
    </section>
)

const Info: FC  = () => {
    const [scroller, setScroller] = useState<null | Scrollbar>(null)
    const profileRef = useRef<HTMLElement>(null)

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

    const handleClick = () => {
        scroller?.scrollIntoView(profileRef.current as HTMLElement)
    }

    return (
        <aside className={styles.info} id='scrollable-content'>
            <header className={styles.header}>
                <div className={styles.shadow}>
                    <div className={styles.logo}>
                        <Image
                            src={Logo}
                            alt='Logo'
                            layout='fixed'
                        />
                    </div>
                    <nav className={styles.nav}>
                        <a href='/'>Inicio</a>
                        <a >Este blog</a>
                        <a onClick={handleClick}>Sobre mi</a>
                    </nav>
                </div>
                <div className={styles.shadow}>
                    <Box className={styles.search}>
                        <SearchIcon />
                        <TextField label='Busqueda' variant='standard'/>
                    </Box>
                </div>
            </header>
            <Me reference={profileRef}/>
        </aside>
    )
}

export default Info