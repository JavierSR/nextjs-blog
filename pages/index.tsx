import { GetStaticProps, NextPage } from 'next'

import { getBlogposts } from '../services/fetch'
import Blogpost from '../models/blogpost.model'
import styles from '../styles/Home.module.scss'
import InfoSection from '../components/home/Info'
import PostsGrid from '../components/home/PostsGrid'

export const getStaticProps: GetStaticProps = async () => {
    const blogposts: Blogpost[] = await getBlogposts()
    return {
        props: {
            blogposts
        }
    }
}

declare interface PageProps {
    blogposts: Blogpost[]
}

const Home: NextPage<PageProps> = ({ blogposts } : PageProps) => (
    <div className={styles.main}>
        <InfoSection />
        <PostsGrid blogposts={blogposts}/>
    </div>
)

export default Home
