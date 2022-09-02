import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'

export default class FixIssuesLog extends CustomBaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public site: string
	@column()
	public email: string
	@column()
	public ftpHost: string
	@column()
	public ftpUsername: string
	@column()
	public ftpPassword: string
	@column()
	public description?: string|null
	@column()
	public customerId?: string|null
	@column()
	public paid: boolean = false

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

}
