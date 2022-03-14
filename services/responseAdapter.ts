import Entry from '../models/entry.model'
import Blogpost from '../models/blogpost.model'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const getFirstParagraph = (nodes : any) => {
    if(!nodes) {
        return ''
    }
    const [firstSection] = nodes
    const { content } = firstSection
    return content.map((item: any) => item.value).join()
}

export const adaptBlogposts = (entry: Entry) : Blogpost[] => {
    const blogposts: Blogpost[] = entry.items.map((value) => {
        const { fields } = value
        return {
            ...fields,
            content: documentToHtmlString(fields.content),
            description: getFirstParagraph(fields.content?.content),
            thumbnail: fields.thumbnail?.fields?.file?.url || ''
        }
    })
    return blogposts
}

