import client from './contentfulClient'
import { adaptBlogposts } from './responseAdapter'

export const getBlogposts = async () => adaptBlogposts(await client.getEntries('blogposts'))