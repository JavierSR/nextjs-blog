import { RefObject } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'

import styles from '../../styles/Header.module.scss'
import Logo from '../../public/logo.png'
import useWidth from '../../helpers/hooks/useWidth'

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
    const width = useWidth()
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
            {(width > 560) && (
                <div className={styles.shadow}>
                    <Box className={styles.search}>
                        <SearchIcon />
                        <TextField label='Busqueda' variant='standard'/>
                    </Box>
                </div>
            )}
        </header>
    )
}

export type { References }

export default Menu