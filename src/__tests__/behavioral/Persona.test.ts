import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import GenerativeClient from '../../GenerativeClient'
import PersonaImpl, { PersonaOptions } from '../../Persona'
import FakeGenerativeClient from '../support/FakeGenerativeClient'
import SpyPersona from '../support/SpyPersona'

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
    protected static async staticCreationMethodAcceptsOptionalCorpus() {
        const corpus = [generateId()]
        const persona = this.Persona({ corpus })
        assert.isEqualDeep(persona.corpus, corpus)
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

    @test()
    protected static async initializesSessionHistory() {
        assert.isEqualDeep(this.persona.history, [])
    }

    @test()
    protected static async savesOneInteractionToSessionHistory() {
        const prompt = generateId()
        const response = this.persona.generate(prompt)

        assert.isLength(this.persona.history, 1)
        assert.isEqualDeep(this.persona.history[0], {
            prompt,
            response,
        })
    }

    @test()
    protected static async savesTwoInteractionsToSessionHistory() {
        const prompt1 = generateId()
        const prompt2 = generateId()

        const response1 = this.persona.generate(prompt1)
        const response2 = this.persona.generate(prompt2)

        assert.isLength(this.persona.history, 2)
        assert.isEqualDeep(this.persona.history[0], {
            prompt: prompt1,
            response: response1,
        })
        assert.isEqualDeep(this.persona.history[1], {
            prompt: prompt2,
            response: response2,
        })
    }

    @test()
    protected static async savesContextInSessionHistory() {
        const prompt = generateId()
        const context = generateId()

        const contextPrompt = `${context} ${prompt}`

        const persona = this.Persona({ context })
        const response = persona.generate(prompt)

        assert.isEqualDeep(persona.history[0], {
            prompt: contextPrompt,
            response,
        })
    }

    private static get fakedClient() {
        return this.persona.getClient() as FakeGenerativeClient
    }

    private static Persona(options?: Partial<PersonaOptions>) {
        return PersonaImpl.Create(options) as SpyPersona
    }
}
