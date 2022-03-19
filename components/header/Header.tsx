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
    const [scroller, setScroller] = useState <null | Scrollbar> (null)
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
            <Menu scrollTo={scrollTo} references={references}/>
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

export default Header