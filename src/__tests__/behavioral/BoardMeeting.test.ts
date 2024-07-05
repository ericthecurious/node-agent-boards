import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import BoardMeetingImpl from '../../BoardMeeting'
import PersonaImpl from '../../Persona'
import FakePersona from '../support/FakePersona'
import SpyBoardMeeting from '../support/SpyBoardMeeting'

export default class BoardMeetingTest extends AbstractSpruceTest {
    private static instance: SpyBoardMeeting

    protected static async beforeEach() {
        await super.beforeEach()

        BoardMeetingImpl.Class = SpyBoardMeeting
        PersonaImpl.Class = FakePersona

        this.instance = this.BoardMeeting()
    }

    @test()
    protected static async canCreateBoardMeeting() {
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = assert.doesThrow(() => BoardMeetingImpl.Create({}))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['personas'],
        })
    }

    @test()
    protected static async commenceCallsGenerateOnPersonas() {
        await this.instance.commence()

        const fakes = this.instance.getPersonas() as unknown as FakePersona[]

        fakes.forEach((fake) => {
            assert.isEqual(fake.numGenerateCalls, 1)
        })
    }

    private static BoardMeeting() {
        return BoardMeetingImpl.Create({
            personas: [this.FakePersona(), this.FakePersona()],
        }) as SpyBoardMeeting
    }

    private static FakePersona() {
        return PersonaImpl.Create() as any
    }
}
