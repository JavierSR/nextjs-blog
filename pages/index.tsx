import { GetStaticProps, NextPage } from 'next'

import { getBlogposts, getGeneralInfo } from '../services/fetch'
import Blogpost from '../models/blogpost.model'
import GeneralInfo from  '../models/generalInfo.model'
import styles from '../styles/Home.module.scss'
import InfoSection from '../components/home/Info'
import PostsGrid from '../components/home/PostsGrid'

export const getStaticProps: GetStaticProps = async () => {
    const blogposts: Blogpost[] = await getBlogposts()
    const generalInfo: GeneralInfo = await getGeneralInfo()

    return {
        props: {
            blogposts,
            generalInfo
        }
    }
}

declare interface PageProps {
    blogposts: Blogpost[]
    generalInfo: GeneralInfo
}

const Home: NextPage<PageProps> = ({ blogposts, generalInfo } : PageProps) => (
    <div className={styles.main}>
        <InfoSection generalInfo={generalInfo} />
        <PostsGrid blogposts={blogposts}/>
    </div>
)

export default Home
