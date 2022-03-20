const contentful = require('contentful');

const dumbString = 'dumbString'

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID || dumbString,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || dumbString,
})

export default client