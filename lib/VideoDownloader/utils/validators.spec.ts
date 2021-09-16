import { describe, it, expect } from '@jest/globals'
import { isValidUrlString } from './validators'

describe('Test Validators functions', () => {
    describe('Test isValidUrlString function', () => {
        describe('Falsy cases', () => {
            it('Should return false if we pass an email', () => {
                const isValid = isValidUrlString('breno@yahoo.com')
                expect(isValid).toBe(false)
            })
    
            it('Should return false if its missing the top-level domain', () => {
                const isValid = isValidUrlString('www.google')
                expect(isValid).toBe(false)
            })
    
            it('Should return false if we send an empty top-level domain', () => {
                const isValid = isValidUrlString('www.google.')
                expect(isValid).toBe(false)
            })
    
            it('Should return false if its missing the "www"', () => {
                const isValid = isValidUrlString('google.com')
                expect(isValid).toBe(false)
            })
        })

        describe('Truthy cases', () => {
            it('Should accept an url without the protocol', () => {
                const isValid = isValidUrlString('www.google.com')
                expect(isValid).toBe(true)
            })

            it('Should accept an url with multiple subdomains', () => {
                const isValid = isValidUrlString('www.drive.google.com')
                expect(isValid).toBe(true)
            })

            it('Should accept an url with unconventional top-level domains', () => {
                const isValid = isValidUrlString('www.joao.dev')
                expect(isValid).toBe(true)
            })
        })
    })
})