import Image from 'next/image'
import { RefObject } from 'react'

import GeneralInfo from  '../../models/generalInfo.model'
import styles from '../../styles/Header.module.scss'
import IgIcon from '../../public/ig.png'
import TwitterIcon from '../../public/twitter.png'
import LinkeInIcon from '../../public/linkedin.png'

const Me = ({ generalInfo, reference } : { generalInfo: GeneralInfo, reference : RefObject<HTMLElement> }) => (
    <section className={styles.me} ref={reference}>
        <div className={styles.profile}>
            <Image
                src={generalInfo.profilePic}
                alt='Me'
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

export default Me