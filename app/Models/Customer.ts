import { column } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'

export enum CustomerType {
	User = "user",
}

export default class Customer extends CustomBaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column()
	public stripeCustomerId?: string|null

	@column()
	public type?: CustomerType|null

}

