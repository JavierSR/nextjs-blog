import Entry from '../models/entry.model'
import Blogpost from '../models/blogpost.model'

export const adaptBlogposts = (entry: Entry) : Blogpost[] => {
    const blogposts: Blogpost[] = entry.items.map((value) => {
        return {
            ...value.fields,
            thumbnail: value.fields.thumbnail.fields?.file?.url || ''
        }
    })
    return blogposts
}

