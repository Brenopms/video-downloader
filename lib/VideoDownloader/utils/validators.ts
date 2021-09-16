import { URL } from 'url'
import { Domains } from './constants'

//!! Do not use this for production
export const isValidUrlString = (url: string) => {
    const urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    const res = url.match(urlRegex)
    return res ? true : false
}