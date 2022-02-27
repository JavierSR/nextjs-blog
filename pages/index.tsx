import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import HomeImage from '../public/home_image.jpg'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { getBlogposts } from '../services/fetch'
import Blogpost from '../models/blogpost.model'
import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'

export const getStaticProps: GetStaticProps = async () => {
  const blogposts: Blogpost[] = await getBlogposts()
  return {
    props: {
      blogposts
    },
  }
}

const Home = ({ blogposts } : { blogposts: Blogpost[] }) => {
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
    <div className={styles['main-container']}>
      <section className={styles.info}>
        <h1>Oscar Sandoval</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus culpa voluptas pariatur error ea provident repellat reprehenderit, amet illo autem blanditiis totam ipsam officiis, ipsum porro odit eum atque aut.</p>
      </section>
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
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={value.thumbnail}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
