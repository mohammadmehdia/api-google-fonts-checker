import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostTrackingResultValidator {

	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		site: schema.string(),
		email: schema.string({}, [ rules.email() ]),
		results: schema.array.nullableAndOptional().members(
			schema.object.nullableAndOptional().members({
				method: schema.string.nullableAndOptional(),
				url: schema.string.nullableAndOptional(),
			})
		),
	})

	public messages: CustomMessages = {}
}
