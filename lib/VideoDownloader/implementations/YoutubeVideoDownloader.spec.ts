import { beforeEach, describe, it, expect, jest } from '@jest/globals'

import fs, { ReadStream, WriteStream } from 'fs'
import { Readable, StreamOptions } from 'stream'
import * as ytdl from 'ytdl-core'

import * as fsHelper from '../utils/fileSystem'
import { VideoDownloader } from '../VideoDownloader'
import { YoutubeVideoDownloader } from './YoutubeVideoDownloader'

beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
})


describe('Testing YoutubeVideoDownloader class', () => {
    it('Should throw an error if url is not valid', async () => {

        jest.mock('ytdl-core', () => ({
            validateURL: () => true,
            getInfo: async () => ({}),
            downloadFromInfo: () => (new Readable())
        }))

        const invalidUrl = 'www.google'
        const youtubeVideoDownloader = new YoutubeVideoDownloader()

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
            .spyOn(ytdl, 'validateURL')
            .mockReturnValue(true)

        const getInfoSpy = jest
            .spyOn(ytdl, 'getInfo')
            .mockResolvedValue({} as ytdl.videoInfo)

        const downloadFromInfoSpy = jest
            .spyOn(ytdl, 'downloadFromInfo')
            .mockReturnValue(new Readable())


        const writeStreamMock = jest
            .spyOn(fs, 'createWriteStream')
            .mockReturnValue({
                path: 'test',
                pipe: (_dest: unknown) => null
            } as unknown as WriteStream)

        const ensureDirectoryExistenceSpy = jest
            .spyOn(fsHelper, 'ensureDirectoryExistence')
            .mockReturnValueOnce()

        const youtubeVideoDownloader = new YoutubeVideoDownloader()

        const validUrl = 'https://www.youtube.com/watch?v=woGfOQ6Ze90'
        await youtubeVideoDownloader.downloadVideo(validUrl, 'path/fake3')

        expect(writeStreamMock).toHaveBeenCalledTimes(1)

    })
})