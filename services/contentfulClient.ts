const contentful = require('contentful');

const dumbString = 'dumbString'

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID || 'oji96otmdj4n',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'fwgt_g4SwhCVhp3KbcE7OfKUzkyYwDDu8T8p--D419c',
})

export default client