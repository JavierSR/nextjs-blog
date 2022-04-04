import { useState, useEffect, FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

import styles from '../../styles/PostsGrid.module.scss'
import Blogpost from '../../models/blogpost.model'
import HomeImage from '../../public/home_image.jpg'
import Scroller from '../Scroller'

declare interface ComponentProps {
    blogposts: Blogpost[]
}

const PostsGrid: FC<ComponentProps> = ({ blogposts } : ComponentProps) => {
    const [classes, setClasses] = useState([styles.card])

    useEffect(() => {
        const firstTimeout = setTimeout(() => {
            setClasses([styles.card, styles.card2])
        }, 300)

        return () => {
            clearInterval(firstTimeout)
        }
    }, [])

    return (
        <section className={styles.content}>
            <div className={styles['inner-container']}>
                <Image
                    src={HomeImage}
                    alt='Garagoa Stones'
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                    placeholder='blur'
                    className={styles.background}
                />
                <Scroller component='Home'>
                    <div className={styles.posts}>
                        {blogposts.map((value, index) => (
                            <Card className={classes.join(' ')} key={index} component='article'>
                                <Link href={`/post/${value.slug}`}>
                                    <a>
                                        <CardActionArea>
                                            <CardMedia
                                                component='img'
                                                height='140'
                                                image={value.thumbnail}
                                                alt={value.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant='h5' component='h5'>
                                                    {value.title}
                                                </Typography>
                                                <Typography variant='body2'>
                                                    {value.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </a>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </Scroller>
            </div>
        </section>
    )
}

export default PostsGrid