import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Scrollbar from 'smooth-scrollbar'
import moment from 'moment'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/ReplyAll'
import Link from 'next/link'

import { getBlogposts, getBlogpostBySlug, getGeneralInfo } from '../../services/fetch'
import Blogpost from '../../models/blogpost.model'
import GeneralInfo from '../../models/generalInfo.model'
import Wrapper from '../../components/Wrapper'
import styles from '../../styles/Post.module.scss'

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

const Post = ({ post, generalInfo }: { post: Blogpost, generalInfo: GeneralInfo }) => {
    const [scroller, setScroller] = useState <null | Scrollbar> (null)
    const [postClasses, setPostClasses] = useState <string[]> ([styles.post])
    const originalPost = {...post}
    console.log({originalPost})
    console.log('--------------------')
    const startScroller = (element: HTMLElement) => {
        const scrollOptions = {
            damping : 0.05,
        }
        setPostClasses([styles.post, styles['post-loaded']])
        setScroller(Scrollbar.init(element, scrollOptions))
    }
    
    useEffect(() => {
        const element = document.querySelector('#post-content') as HTMLElement
        startScroller(element)
        return () => {
            if(scroller) {
                Scrollbar.destroy(element)
            }
        }
    }, [])

    const postToRender = post || {}
    return (
        <Wrapper generalInfo={generalInfo}>
            <div id='post-content' className={styles.container}>
                <div className={postClasses.join(' ')}>
                    <h1>{postToRender.title}</h1>
                    <div className={styles.postInfo}>
                        <div><h6>Por {postToRender.author}</h6> • <h6>{postToRender.readingEstimate} READ</h6></div>
                        <div>
                            <h6>{moment(postToRender.publishDate).format('LL')}</h6>
                        </div>
                    </div>
                    <section dangerouslySetInnerHTML={{ __html: postToRender.content }}></section>
                    <Link href='/'>
                        <div className={styles.back}>
                            <Button variant='contained' startIcon={<SendIcon />}>Volver</Button>
                        </div>
                    </Link>
                </div>
            </div>
        </Wrapper>
    )
}

export default Post