import client from './contentfulClient'
import { adaptBlogposts } from './responseAdapter'

export const getBlogposts = async () => adaptBlogposts(await client.getEntries('blogposts'))

export const getBlogpostBySlug = async (slug: string) => {
    const matchedBlogposts = await client.getEntries({
        content_type: 'blogposts',
        'fields.slug': slug
    })
    return adaptBlogposts(matchedBlogposts)
}