import { GetStaticProps, NextPage } from 'next'

import { getBlogposts, getGeneralInfo } from '../services/fetch'
import Blogpost from '../models/blogpost.model'
import GeneralInfo from  '../models/generalInfo.model'
import PostsGrid from '../components/home/PostsGrid'
import Wrapper from '../components/Wrapper'

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
    <Wrapper generalInfo={generalInfo}>
        <PostsGrid blogposts={blogposts}/>
    </Wrapper>
)

export default Home
