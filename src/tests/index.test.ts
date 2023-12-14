import { describe, it, expect } from 'vitest'
import { server } from '../index'

describe('test server', () => {
    it('server should be running', () => {
        expect(server.listening).toBe(true)

        server.close()
    })
})
