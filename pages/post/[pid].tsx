import { GetStaticProps, GetStaticPaths } from 'next'

import { getBlogposts, getBlogpostBySlug, getGeneralInfo } from '../../services/fetch'
import Blogpost from '../../models/blogpost.model'
import GeneralInfo from '../../models/generalInfo.model'
import Layout from '../../components/Layout'
import Post from '../../components/post/Post'

export const getStaticPaths: GetStaticPaths = async () => {
    const blogposts: Blogpost[] = await getBlogposts()
    const paths = blogposts.map((value) => ({ params: { pid: value.slug } }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.pid
  const [post]: Blogpost[] = await getBlogpostBySlug(slug as string)
  const generalInfo: GeneralInfo = await getGeneralInfo()
  return {
      props: {
          post: post || {},
          generalInfo
      },
  }
}

const BlogpostPage = ({ post, generalInfo } : { post: Blogpost, generalInfo: GeneralInfo }) => {
    const content: Blogpost = post || {}
    return (
        <Layout 
            generalInfo={generalInfo}
            title={`${content.title} - Píxeles sin contexto`}
            keywords={content.keywords}
            description={content.description}
            image={content.thumbnail}
            slug={content.slug}
        >
            <Post post={content}/>
        </Layout>
    )
}

export default BlogpostPage