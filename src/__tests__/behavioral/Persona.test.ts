import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import GenerativeClient from '../../GenerativeClient'
import PersonaImpl, { PersonaOptions } from '../../Persona'
import FakeGenerativeClient from './FakeGenerativeClient'
import SpyPersona from './SpyPersona'

export default class PersonaTest extends AbstractSpruceTest {
    private static persona: SpyPersona

    protected static async beforeEach() {
        await super.beforeEach()

        PersonaImpl.Class = SpyPersona
        GenerativeClient.Class = FakeGenerativeClient

        this.persona = this.Persona()
    }

    @test()
    protected static async canCreatePersona() {
        assert.isTruthy(this.persona)
    }

    @test()
    protected static async staticCreationMethodAcceptsName() {
        const name = generateId()
        const persona = this.Persona({ name })
        assert.isEqual(persona.name, name)
    }

    @test()
    protected static async instantiatesGenerativeClient() {
        assert.isTruthy(this.fakedClient, 'Client is not truthy!')
        assert.isEqual(
            this.fakedClient.wasInstantiated,
            true,
            'Client was not instantiated!'
        )
    }

    @test()
    protected static async constructorDoesNotInstantiateClient() {
        const persona = new SpyPersona({} as PersonaOptions)
        const client = persona.getClient()
        assert.isUndefined(client, 'Client should be undefined!')
    }

    @test()
    protected static async staticCreationMethodAcceptsOptionalClient() {
        const client = new FakeGenerativeClient()
        const persona = this.Persona({ client })
        assert.isEqualDeep(persona.getClient(), client)
    }

    @test()
    protected static async staticCreationMethodAcceptsOptionalContext() {
        const context = generateId()
        const persona = this.Persona({ context })
        assert.isEqualDeep(persona.context, context)
    }

    @test()
    protected static async generateAcceptsAndReturnsTypeString() {
        const prompt = generateId()
        const result = this.persona.generate(prompt)
        assert.isString(result)
    }

    @test()
    protected static async generateOnPersonaCallsGenerateOnClient() {
        const prompt = generateId()
        this.persona.generate(prompt)
        assert.isEqualDeep(this.fakedClient.generateCalls, [prompt])
    }

    @test()
    protected static async generateAddsContextToPromptIfDefined() {
        const context = generateId()
        const prompt = generateId()

        const persona = this.Persona({ context })
        const fakedClient = persona.getClient() as FakeGenerativeClient

        persona.generate(prompt)

        assert.isEqualDeep(fakedClient.generateCalls, [`${context} ${prompt}`])
    }

    private static get fakedClient() {
        return this.persona.getClient() as FakeGenerativeClient
    }

    private static Persona(options?: Partial<PersonaOptions>) {
        return PersonaImpl.Create(options) as SpyPersona
    }
}
