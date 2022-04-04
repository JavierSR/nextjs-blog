import { FC, useEffect, useState, useRef, RefObject, useContext } from 'react'

import GeneralInfo from  '../../models/generalInfo.model'
import styles from '../../styles/Header.module.scss'
import Me from './Me'
import Menu, { References } from './Menu'
import Scroller from '../Scroller'
import { Context } from '../../contexts/deviceContext'

declare interface ComponentProps {
    generalInfo: GeneralInfo
}

const Header: FC<ComponentProps> = ({ generalInfo } : ComponentProps) => {
    const { state, dispatch } = useContext(Context)
    const [showSections, setShowSections] = useState <boolean> (false)
    const references: References = {
        top: useRef<HTMLElement>(null),
        profile: useRef<HTMLElement>(null),
        description: useRef<HTMLElement>(null),
    }

    const handleResize = () => {
        const isDesktopSize = window.innerWidth > 560
        dispatch({
            type: 'setIsDesktop',
            value: isDesktopSize
        });
    }
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const scrollTo = (element: RefObject<HTMLElement>) => {
        setShowSections(true)

        const executeScroll = () => element.current?.scrollIntoView({
            behavior: 'smooth'
        })

        if(showSections) {
            executeScroll()
        }
        else {}
        setTimeout(() => {
            executeScroll()
        }, 300)
    }
    
    const { isDesktop } = state
    return (
        <Scroller>
            <aside className={styles.info}>
                <Menu scrollTo={scrollTo} references={references}/>
                {(showSections || isDesktop) && (
                    <>
                        <div ref={references.description as RefObject<HTMLDivElement>} className={styles.about}>
                            <div className={styles.shadow}>
                                <h1>Píxeles sin contexto</h1>
                                <p dangerouslySetInnerHTML={{__html: generalInfo.description}}></p>
                            </div>
                        </div>
                        <Me generalInfo={generalInfo} reference={references.profile}/>
                    </>)
                }
            </aside>
        </Scroller>
    )
}

export default Header