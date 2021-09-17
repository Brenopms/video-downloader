import { beforeEach, describe, it, expect, jest } from '@jest/globals'

import fs, { WriteStream, createWriteStream } from 'fs'
import { Readable } from 'stream'
import ytdl from 'ytdl-core'
import * as ytdlLib from '../../../lib/ytdl'

import * as fsHelper from '../utils/fileSystem'
import { VideoDownloader } from '../VideoDownloader'
import { YoutubeVideoDownloader } from './YoutubeVideoDownloader'


let youtubeVideoDownloader: VideoDownloader

beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()

    youtubeVideoDownloader = new YoutubeVideoDownloader()
})

describe('Testing YoutubeVideoDownloader class', () => {
    let writeStreamSpy: jest.SpiedFunction<typeof createWriteStream>
    let ensureDirectoryExistenceSpy: jest.SpiedFunction<typeof fsHelper.ensureDirectoryExistence>
    let consoleTableSpy: jest.SpiedFunction<typeof console.table>

    beforeEach(() => {
        writeStreamSpy = jest
            .spyOn(fs, 'createWriteStream')
            .mockReturnValue({} as unknown as WriteStream) as jest.SpiedFunction<typeof createWriteStream>

        ensureDirectoryExistenceSpy = jest
            .spyOn(fsHelper, 'ensureDirectoryExistence')
            .mockReturnValueOnce() as jest.SpiedFunction<typeof fsHelper.ensureDirectoryExistence>

        consoleTableSpy = jest
            .spyOn(console, 'table')
            .mockImplementation((_text) => { }) as jest.SpiedFunction<typeof console.table>

    })


    it('Should throw an error if url is not valid', async () => {

        jest.mock('ytdl-core', () => ({
            validateURL: () => true,
            getInfo: async () => ({}),
            downloadFromInfo: () => (new Readable())
        }))

        const invalidUrl = 'www.google'

        expect(youtubeVideoDownloader.downloadVideo(invalidUrl, 'path/fake3'))
            .rejects
            .toThrowError('Invalid URL')
    })

    it('Should download the video  and log the info if url is valid', async () => {

        jest.mock('ytdl-core', () => {
            const original = jest.requireActual('ytdl-core') as object
            return {
                ...original,
                validateURL: jest.fn()
            }
        })
        const validateURLSpy = jest
            .spyOn(ytdlLib, 'validateURL')
            .mockReturnValue(true)

        const getInfoSpy = jest
            .spyOn(ytdlLib, 'getInfo')
            .mockResolvedValue({} as ytdl.videoInfo)

        const downloadFromInfoSpy = jest
            .spyOn(ytdlLib, 'downloadFromInfo')
            .mockReturnValue({ pipe: (file: unknown) => null } as unknown as Readable)

        const validUrl = 'https://www.youtube.com/watch?v=woGfOQ6Ze90'
        await youtubeVideoDownloader.downloadVideo(validUrl, 'path/fake3')

        expect(writeStreamSpy).toHaveBeenCalledTimes(1)
        expect(consoleTableSpy).toHaveBeenCalled()
    })
})