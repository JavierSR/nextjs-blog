import { RefObject, useContext } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'

import styles from '../../styles/Header.module.scss'
import Logo from '../../public/logo.svg'
import { Context } from '../../contexts/deviceContext'

declare interface References {
    top: RefObject<HTMLElement>
    profile: RefObject<HTMLElement>
    description: RefObject<HTMLElement>
}

declare interface MenuProps { 
    scrollTo: (props: RefObject<HTMLElement>) => void
    references: References
}

const Menu = ({ scrollTo, references } : MenuProps ) => {
    const { state } = useContext(Context)
    return (
        <header className={styles.header}>
            <div className={styles.shadow}>
                <div className={styles.logo}>
                    <Link href='/'>
                        <a>
                            <Image
                                src={Logo}
                                alt='Logo'
                                layout='fill'
                            />
                        </a>
                    </Link>
                </div>
                <nav className={styles.nav}>
                    <Link href='/'>
                        <a>Inicio</a>
                    </Link>
                    <a onClick={() => scrollTo(references.description)}>Este blog</a>
                    <a onClick={() => scrollTo(references.profile)}>Sobre mi</a>
                </nav>
            </div>
            {state.isDesktop && (
                <div className={styles.shadow}>
                    <Box className={styles.search}>
                        <SearchIcon />
                        <TextField variant='standard'/>
                    </Box>
                </div>
            )}
        </header>
    )
}

export type { References }

export default Menu