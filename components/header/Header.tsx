import { FC, useEffect, useState, useRef, RefObject } from 'react'
import Scrollbar from 'smooth-scrollbar'

import GeneralInfo from  '../../models/generalInfo.model'
import styles from '../../styles/Header.module.scss'
import Me from './Me'
import Menu, { References } from './Menu'

declare interface ComponentProps {
    generalInfo: GeneralInfo
}

const Header: FC<ComponentProps> = ({ generalInfo } : ComponentProps) => {
    const [isDesktop, setIsDesktop] = useState <boolean | null>(null)
    const [showSections, setShowSections] = useState <boolean> (false)
    const [scroller, setScroller] = useState <null | Scrollbar> (null)
    const references: References = {
        top: useRef<HTMLElement>(null),
        profile: useRef<HTMLElement>(null),
        description: useRef<HTMLElement>(null),
    }

    const handleResize = () => {
        setIsDesktop(window.innerWidth > 560)
    }

    const startScroller = (element: HTMLElement) => {
        const scrollOptions = {
            damping : 0.05,
        }
        setScroller(Scrollbar.init(element, scrollOptions))
    }
    
    useEffect(() => {
        const element = document.querySelector('#scrollable-content') as HTMLElement

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
            
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            if(scroller) {
                Scrollbar.destroy(element)
            }
        }
    }, [])

    useEffect(() => {
        if(isDesktop && !scroller) {
            const element = document.querySelector('#scrollable-content') as HTMLElement
            startScroller(element)
        }
    }, [isDesktop])

    const scrollTo = (element: RefObject<HTMLElement>) => {
        setShowSections(true)
        if(isDesktop) {
            scroller?.scrollIntoView(element.current as HTMLElement, {
                offsetTop: 15
            })
        }
        else {
            const executeScroll = () => element.current?.scrollIntoView({
                behavior: 'smooth'
            })

            if(showSections) {
                executeScroll()
            }
            else {}
            setTimeout(() => {
                executeScroll()
            }, 500)
        }
    }
    
    return (
        <aside className={styles.info} id='scrollable-content'>
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
                </>
            )}
        </aside>
    )
}

export default Header