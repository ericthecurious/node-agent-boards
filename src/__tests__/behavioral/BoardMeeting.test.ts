import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import BoardMeetingImpl, { BoardMeetingOptions } from '../../BoardMeeting'
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

        const fakes = this.getFakesFrom(this.instance)

        fakes.forEach((fake) => {
            assert.isEqual(fake.numGenerateCalls, 1)
        })
    }

    @test()
    protected static async acceptsOptionalPrompt() {
        const prompt = generateId()

        const instance = this.BoardMeeting({
            prompt,
        })

        await instance.commence()

        const fakes = this.getFakesFrom(instance)

        fakes.forEach((fake) => {
            assert.isEqual(fake.lastGenerateCall, prompt)
        })
    }

    private static getFakesFrom(instance: SpyBoardMeeting) {
        return instance.getPersonas() as unknown as FakePersona[]
    }

    private static FakePersona() {
        return PersonaImpl.Create() as any
    }

    private static BoardMeeting(options?: Partial<BoardMeetingOptions>) {
        return BoardMeetingImpl.Create({
            personas: [this.FakePersona(), this.FakePersona()],
            ...options,
        }) as SpyBoardMeeting
    }
}
