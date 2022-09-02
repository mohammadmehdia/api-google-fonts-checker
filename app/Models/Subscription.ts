import { DateTime } from 'luxon'
import { column, computed, scope } from '@ioc:Adonis/Lucid/Orm'
import CustomBaseModel from 'App/Models/CustomBaseModel'

export type SubscriptionMetaData = {
	voucherId?: number,
	voucherCode?: string,
	voucherJobs?: number,
	postedJobs?: number,
}

export default class Subscription extends CustomBaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public title?: string

	@column()
	public code?: string|null

	@column({serializeAs: null})
	public stripeCustomerId?: string|null

	@column({serializeAs: null})
	public userId?: number|null

	@column({serializeAs: null})
	public companyId?: number|null

	@column.date()
	public startDate: DateTime

	@column.date()
	public endDate: DateTime

	@column({ prepare: CustomBaseModel.jsonStringify, consume: CustomBaseModel.jsonParse, })
	public metadata?: SubscriptionMetaData|null

	public static isActive = scope(query => {
		query.where('endDate', '>=', DateTime.now().toISODate())
	})

	@computed()
	public get jobStatus() {
		const total = this.metadata?.voucherJobs ?? 1
		const jobs = this.metadata?.postedJobs ?? 0
		const rem = Math.max( 0, total - jobs )
		return `${rem} / ${total}`
	}

	@computed()
	public get availableFor() {
		// const h = Math.floor( this.endDate.diffNow('hours').get('hours') ) % 24
		// const m = Math.floor( this.endDate.diffNow('months').get('months') )
		// const d = Math.floor( this.endDate.diffNow('days').get('days') )
		const diff = this.endDate.diffNow(["years", "months", "days", "hours"])
		return {
			m: Math.max(0, Math.floor(diff.months ?? 0) ),
			d: Math.max( 0, Math.floor(diff.days ?? 0) ),
			h: Math.max( 0, Math.floor(diff.hours ?? 0) ),
		}
	}
}
