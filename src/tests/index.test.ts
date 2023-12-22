import { describe, it, expect } from 'vitest'
import { server } from '../index'

describe('test server', () => {
    it('should be running', async () => {
        expect(server).toBeTruthy()
    })
})
