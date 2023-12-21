import { describe, it, expect } from 'vitest'
import { port } from '../index'

describe('test server', () => {
    it('should be using port for http server', () => {
        expect(port).toBeTruthy()
    })
})
