import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FixIssuesValidator {

	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		tid: schema.string(),
		tt: schema.string(),
		ftpHost: schema.string(),
		ftpUsername: schema.string(),
		ftpPassword: schema.string(),
		description: schema.string.optional(),
	})

	public messages: CustomMessages = {}
}
