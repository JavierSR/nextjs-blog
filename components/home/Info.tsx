import Image from 'next/image'
import { FC } from 'react'

import styles from '../../styles/Info.module.scss'
import Me from '../../public/me.jpeg'
import IgIcon from '../../public/ig.png'
import TwitterIcon from '../../public/twitter.png'
import LinkeInIcon from '../../public/linkedin.png'

const Info: FC  = () => (
    <section className={styles.info}>
        <div className={styles.me}>
            <Image
                src={Me}
                alt='Me'
                placeholder='blur'
                layout='fill'
            />
        </div>
        <div className={styles.ig}>
            <a href='https://www.instagram.com/oscarjajavier/' target='_blank' rel='noopener noreferrer'>
                <Image
                    src={IgIcon}
                    alt='Instagram'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.twitter}>
            <a href='https://twitter.com/oj_45' target='_blank' rel='noopener noreferrer'>
                <Image
                    src={TwitterIcon}
                    alt='Twitter'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles.linkedin}>
            <a href='https://www.linkedin.com/in/oscar-sandoval-5570981b1/' target='_blank' rel='noopener noreferrer'>
                <Image
                    src={LinkeInIcon}
                    alt='LinkedIn'
                    layout='fill'
                />
            </a>
        </div>
        <div className={styles['text-container']}>
            <h1>Oscar Sandoval</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus culpa voluptas pariatur error ea provident repellat reprehenderit, amet illo autem blanditiis totam ipsam officiis, ipsum porro odit eum atque aut.</p>
        </div>
    </section>
)

export default Info