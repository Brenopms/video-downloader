import { URL } from 'url'
import { Domains } from './constants'

export const isValidUrlString = (url: string) => {
    const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    const res = url.match(urlRegex)
    return res ? true : false
}

export const doesMatchDomain = (url: string, domain: Domains) => {
    const urlDomain = new URL(url)
    return urlDomain.hostname === domain
}

export const isValidUrl = (url: string, domain: Domains) => {
    return isValidUrlString(url) && doesMatchDomain(url, domain)
}