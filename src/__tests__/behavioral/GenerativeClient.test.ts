import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import GenerativeClientImpl from '../../GenerativeClient'

export default class GenerativeClientTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateGenerativeClient() {
        const client = this.Client()
        assert.isTruthy(client)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = assert.doesThrow(() => GenerativeClientImpl.Create({}))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['clientUrl', 'apiKey'],
        })
    }

    private static Client() {
        return GenerativeClientImpl.Create({
            clientUrl: 'abcd',
            apiKey: '1234',
        })
    }
}
