import { beforeEach, describe, it, expect, jest } from '@jest/globals'
import fs from 'fs'
import { ensureDirectoryExistence } from './fileSystem'

beforeEach(() => {
    jest.mock('path/posix', () => ({
        dirname: (path: string) => '/mock/path'
    }))
})


describe('Testing fileSystem utils module', () => {
    describe('Testing ensureDirectoryExistence function', () => {
        it('Should create an directory if the folder do not exist', () => {
            const existsSyncSpy = jest.spyOn(fs, 'existsSync')
            const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync')

            existsSyncSpy.mockReturnValueOnce(false)
            mkdirSyncSpy.mockImplementationOnce(() => undefined)

            ensureDirectoryExistence('fake/path')

            expect(mkdirSyncSpy).toHaveBeenCalledTimes(1)
        })


        it('Should not try to create a directory if the folder already exists', () => {
            const existsSyncSpy = jest.spyOn(fs, 'existsSync')
            const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync')

            existsSyncSpy.mockReturnValueOnce(true)
            mkdirSyncSpy.mockImplementationOnce(() => undefined)

            ensureDirectoryExistence('fake/path')

            expect(mkdirSyncSpy).not.toHaveBeenCalled()
        })
    })
})