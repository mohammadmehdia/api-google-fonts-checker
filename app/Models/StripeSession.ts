import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'
import Customer from 'App/Models/Customer'

export default class StripeSession extends CustomBaseModel {

	@column({ isPrimary: true })
	public id: string

	@column()
	public amountSubtotal?: number|null

	@column()
	public amountTotal?: number|null

	@column()
	public currency?: string|null

	@column()
	public customerId?: string|null

	@column()
	customerEmail?: string|null

	@column()
	public mode?: string|null

	@column()
	public paymentStatus?: string|null

	@column()
	public status?: string|null

	@column({serialize: Boolean})
	public liveMode?: boolean|null

	@column({
		prepare: CustomBaseModel.jsonStringify,
		consume: CustomBaseModel.jsonParse,
	})
	public customerDetails?: object|string|null

	@column({
		prepare: CustomBaseModel.jsonStringify,
		consume: CustomBaseModel.jsonParse,
	})
	public metadata?: Record<string, string|number|null> | null

	@column({
		prepare: CustomBaseModel.jsonStringify,
		consume: CustomBaseModel.jsonParse,
	})
	public totalDetails?: object|string|null

	@column()
	public url?: string|null

	@belongsTo(() => Customer, {foreignKey: 'customerId', localKey: 'stripeCustomerId'})
	public customer: BelongsTo<typeof Customer>

}
