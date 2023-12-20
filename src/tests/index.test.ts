import { describe, it, expect } from 'vitest'
import { port, server } from '../index'

describe('test server', () => {
    it('should be using port for http server', () => {
        expect(port).toBeTruthy()
    })

    it('server should be running', () => {
        expect(server.listening).toBe(true)

        server.close()
    })
})
