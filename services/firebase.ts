import { initializeApp  } from 'firebase/app'
import { getDatabase, get, set, ref, child, update } from "firebase/database"
import Votes from '../models/votes.model'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'pixeles-sin-contexto.firebaseapp.com',
    databaseURL: 'https://pixeles-sin-contexto-default-rtdb.firebaseio.com',
    projectId: 'pixeles-sin-contexto',
    storageBucket: 'pixeles-sin-contexto.appspot.com',
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const dbReference = ref(db)

const getPostSnapshot = (postSlug: string) => get(child(dbReference, `votes/${postSlug}`)).then((snapshot) => snapshot)

export const getPostVotes = (postSlug: string): Promise <Votes> => {
    return getPostSnapshot(postSlug).then((snapshot) => {
        if(!snapshot.exists()) {
            return {
                upvotes: 0,
                downvotes: 0
            }
        }
        
        return snapshot.val()
    })
}

const createPost = async (postSlug: string, data: Votes): Promise <Votes> => {
    await set(ref(db, `votes/${postSlug}`), data)
    return data
}

declare interface UpdateVote {
    slug: string
    isAdding: boolean
    key: 'upvotes' | 'downvotes'
}

export const updateVote = async ({ slug, isAdding, key } : UpdateVote ): Promise <Votes> => {
    const snapshot = await getPostSnapshot(slug)
    if(snapshot.exists()) {
        const votes: Votes = snapshot.val()
        const newValue = isAdding ? ++votes[key] : --votes[key]
        return update(dbReference, {
            [`votes/${slug}/${key}`]: newValue
        }).then(() => {
            return getPostVotes(slug)
        })
    }

    const defaultPost = {
        upvotes: 0,
        downvotes: 0
    }

    defaultPost[key] = 1
    return createPost(slug, defaultPost)
}