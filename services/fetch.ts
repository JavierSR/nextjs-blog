import client from './contentfulClient'
import { adaptBlogposts, adaptGeneralInfo } from './responseAdapter'

export const getGeneralInfo = async () => adaptGeneralInfo(await client.getEntries({ content_type: 'generalInfo' })) 

export const getBlogposts = async () => adaptBlogposts(await client.getEntries({ 
    content_type: 'blogposts',
    order: '-fields.publishDate'
}))

export const getBlogpostBySlug = async (slug: string) => {
    const matchedBlogposts = await client.getEntries({
        content_type: 'blogposts',
        'fields.slug': slug
    })
    return adaptBlogposts(matchedBlogposts)
}