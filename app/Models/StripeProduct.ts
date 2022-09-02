import { column } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'

export default class StripeProduct extends CustomBaseModel {
	@column({ isPrimary: true })
	public id: string

	@column()
	public code: string

	@column()
	public priceId: string

	@column({ prepare: CustomBaseModel.jsonStringify, consume: CustomBaseModel.jsonParse, serializeAs: null })
	public productData?: object|string|null

	@column({ prepare: CustomBaseModel.jsonStringify, consume: CustomBaseModel.jsonParse, serializeAs: null })
	public priceData?: object|string|null


}

