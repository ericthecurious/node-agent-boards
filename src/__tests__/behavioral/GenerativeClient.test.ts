import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import GenerativeClientImpl from '../../GenerativeClient'

export default class GenerativeClientTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateGenerativeClient() {
        const client = this.Client()
        assert.isTruthy(client)
    }

    private static Client() {
        return GenerativeClientImpl.Create()
    }
}
