import { GetStaticProps, GetStaticPaths } from 'next'
import { getBlogposts, getBlogpostBySlug } from '../../services/fetch'
import Blogpost from '../../models/blogpost.model'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogposts: Blogpost[] = await getBlogposts()
  const paths = blogposts.map((value) => ({ params: { pid: value.slug }}))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.pid
  const [post]: Blogpost[] = await getBlogpostBySlug(slug as string)
  return {
    props: {
      post
    },
  }
}

const Post = ({ post }: { post: Blogpost}) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.content}}></div>
    </div>
  )
}

export default Post