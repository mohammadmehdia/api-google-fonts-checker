import { DateTime } from 'luxon'
import { beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'
import { TokenGenerator, TokenBase } from 'ts-token-generator';

export default class TrackResult extends CustomBaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column()
	public site: string

	@column()
	public ip: string

	@column()
	public trackId: string

	@column()
	public tt: string

	@column({
		prepare: CustomBaseModel.jsonStringify,
		consume: CustomBaseModel.jsonParse,
	})
	public results: object|string|null

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime


	@beforeCreate()
	public static beforeCreateFn(item: TrackResult) {
		const tokenGenerator = new TokenGenerator({ bitSize: 512 , baseEncoding: TokenBase.BASE62 });
		item.trackId = new TokenGenerator().generate()
		item.tt = `${tokenGenerator.generate()}-${tokenGenerator.generate()}`
	}

}
