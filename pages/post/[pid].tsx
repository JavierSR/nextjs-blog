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
import Votes from '../../models/votes.model'
import Wrapper from '../../components/Wrapper'
import styles from '../../styles/Post.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import LinkIcon from '@mui/icons-material/Link'
import Snackbar from '@mui/material/Snackbar'
import Grow, { GrowProps } from '@mui/material/Grow'
import { getPostVotes, updateVote } from '../../services/firebase'

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

const DOMAIN_NAME = 'pixelessincontexto.com'
const STORAGE_KEY  ='pixeles-sin-contexto_votes'

const GrowTransition = (props: GrowProps) => <Grow {...props} />

const Post = ({ post, generalInfo }: { post: Blogpost, generalInfo: GeneralInfo }) => {
    const [scroller, setScroller] = useState <null | Scrollbar> (null)
    const [postUrl, setPostUrl] = useState <string> ('')
    const [postClasses, setPostClasses] = useState <string[]> ([styles.post])
    const [currentAlert, setCurrentAlert] = useState <string | null> (null)
    const [voteHistory, setVoteHistory] = useState <{ [key: string]: boolean}> ({})
    const [votes, setVotes] = useState <Votes> ({
        upvotes: 0,
        downvotes: 0
    })

    const startScroller = (element: HTMLElement) => {
        const scrollOptions = {
            damping : 0.05,
        }
        setPostClasses([styles.post, styles['post-loaded']])
        setScroller(Scrollbar.init(element, scrollOptions))
    }
    
    const loadVotes = async () => {
        const votes: Votes = await getPostVotes(post.slug)
        setVotes(votes)
    }

    useEffect(() => {
        const element = document.querySelector('#post-content') as HTMLElement
        startScroller(element)

        if(typeof window !== 'undefined') {
            setPostUrl(`https://www.${DOMAIN_NAME}${window?.location?.pathname}`)
            setVoteHistory(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'))
        }

        loadVotes()
        return () => {
            if(scroller) {
                Scrollbar.destroy(element)
            }
        }
    }, [])

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(postUrl)
        showToast('¡Link copiado al portapapeles!')
    }

    const handleClose = () => {
        setCurrentAlert(null)
    }

    const showToast = (toastText: string) => {
        setCurrentAlert(toastText)
        setTimeout(() => setCurrentAlert(null), 1500)
    }

    const upvote = async () => {
        if(voteHistory[post.slug]) {
            showToast('Ya votaste positivo para este post')
            return
        }

        if(voteHistory[post.slug] === false) {
            await updateVote({
                slug: post.slug,
                key: 'downvotes',
                isAdding: false
            })
        }

        updateVote({
            slug: post.slug,
            key: 'upvotes',
            isAdding: true
        }).then((updatedVotes: Votes) => {
            setVotes(updatedVotes)
            showToast('Voto positivo registrado ¡Gracias!')
            const newVoteHistory = { ...voteHistory, [post.slug] : true }
            setVoteHistory(newVoteHistory)
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newVoteHistory))
        })
    }

    const downvote = async () => {
        if(voteHistory[post.slug] === false) {
            showToast('Ya votaste negativo para este post')
            return
        }

        if(voteHistory[post.slug]) {
            await updateVote({
                slug: post.slug,
                key: 'upvotes',
                isAdding: false
            })
        }

        updateVote({
            slug: post.slug,
            key: 'downvotes',
            isAdding: true
        }).then((updatedVotes: Votes) => {
            setVotes(updatedVotes)
            showToast('Voto negativo registrado :(')
            const newVoteHistory = { ...voteHistory, [post.slug] : false }
            setVoteHistory(newVoteHistory)
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newVoteHistory))
        })
    }

    const content: Blogpost = post || {}
    return (
        <Wrapper generalInfo={generalInfo}>
            <div id='post-content' className={styles.container}>
                <div className={postClasses.join(' ')}>
                    <h1>{content.title}</h1>
                    <div className={styles.postInfo}>
                        <div><h6>Por {content.author}</h6> • <h6>{content.readingEstimate} READ</h6></div>
                        <div>
                            <h6>{moment(content.publishDate).format('LL')}</h6>
                        </div>
                    </div>
                    <section dangerouslySetInnerHTML={{ __html: content.content }}></section>
                    <Snackbar 
                        open={!!currentAlert}
                        onClose={handleClose}
                        TransitionComponent={GrowTransition}
                        message={currentAlert}
                        key={GrowTransition.name}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    />
                    <section className={styles.bottom}>
                        <div className={styles.share}>
                            <h6>Compartir</h6>
                            <div>
                                <a 
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <FacebookRoundedIcon />
                                </a>
                                <a 
                                    href={`https://twitter.com/intent/tweet?text=${postUrl}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <TwitterIcon />
                                </a>
                                <a 
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <LinkedInIcon />
                                </a>
                                <a 
                                    href={`https://api.whatsapp.com/send?text=${postUrl}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    data-action='share/whatsapp/share'
                                >
                                    <WhatsAppIcon />
                                </a>
                                <a 
                                    onClick={copyLinkToClipboard}
                                    rel='noopener noreferrer'>
                                    <LinkIcon />
                                </a>
                            </div>
                        </div>
                        <div className={styles.votes}>
                            <div>
                                <div className={styles.positive}>
                                    <span>{votes.upvotes}</span>
                                    <ArrowUpwardIcon onClick={upvote}/>
                                </div>
                                <div className={styles.negative}>
                                    <span>{votes.downvotes}</span>
                                    <ArrowDownwardIcon onClick={downvote}/>
                                </div>
                            </div>
                        </div>
                    </section>
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