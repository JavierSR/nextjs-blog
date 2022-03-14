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

declare interface ComponentProps {
    blogposts: Blogpost[]
}

const PostsGrid: FC<ComponentProps> = ({ blogposts } : ComponentProps) => {
    const [classes, setClasses] = useState([styles.card])
    
    useEffect(() => {
        const firstTimeout = setTimeout(() => {
            setClasses([styles.card, styles.card2])
        }, 300)
      
        const secondTimeout = setTimeout(() => {
            setClasses([styles.card3])
        }, 1800)
        
        return () => {
            clearInterval(firstTimeout)
            clearInterval(secondTimeout)
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
                <div className={styles.posts}>
                    {blogposts.map((value, index) => (
                        <Card className={classes.join(' ')} key={index}>
                            <Link href={`post/${value.slug}`}>
                                <CardActionArea>
                                    <CardMedia
                                        component='img'
                                        height='140'
                                        image={value.thumbnail}
                                        alt='green iguana'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' component='h5'>
                                            {value.title}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PostsGrid