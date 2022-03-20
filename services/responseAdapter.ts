import Entry from '../models/entry.model'
import Blogpost from '../models/blogpost.model'
import GeneralInfo from  '../models/generalInfo.model'
import { BLOCKS } from '@contentful/rich-text-types'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const getFirstParagraph = (nodes : any) => {
    if(!nodes) {
        return ''
    }
    let firstParagraph
    for (const node of nodes) {
        if(node.nodeType !== 'embedded-asset-block') {
            firstParagraph = node
            break
        }
    }
    const { content } = firstParagraph
    return content.map((item: any) => item.value).join()
}

const getImageUrlFromField = (content : any) => {
    return 'https:' + (content?.fields.file?.url || '')
}

export const adaptGeneralInfo = (entry: Entry) : GeneralInfo => {
    const [generalInfo] = entry.items
    const { fields } = generalInfo
    return {
        description: fields.siteDescription,
        bio: fields.bio,
        linkedin: fields.socialLinkedin,
        twitter: fields.socialTwitter,
        ig: fields.socialIg,
        profilePic: getImageUrlFromField(fields.profilePic)
    }
}

const parseHTMLOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const { fields } = node.data.target
            return `<div>
                        <img src='https://${fields.file.url}' alt='${fields.description}'/>
                    </div>`
        }
    }
}

export const adaptBlogposts = (entry: Entry) : Blogpost[] => {
    const blogposts: Blogpost[] = entry.items.map((value) => {
        const { fields } = value
        return {
            ...fields,
            author: fields.author?.fields?.name || null,
            content: documentToHtmlString(fields.content, parseHTMLOptions),
            description: getFirstParagraph(fields.content?.content),
            thumbnail: getImageUrlFromField(fields.thumbnail)
        }
    })
    return blogposts
}
