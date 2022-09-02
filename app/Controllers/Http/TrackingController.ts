// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostTrackingResultValidator from 'App/Validators/PostTrackingResultValidator'
import _ from 'lodash'
import TrackResult from 'App/Models/TrackResult'
import FixIssuesValidator from 'App/Validators/FixIssuesValidator'
import FixIssuesLog from 'App/Models/FixIssuesLog'
import StripeHelper from 'App/Helpers/stripe/StripeHelper'
import StripeProduct from 'App/Models/StripeProduct'
import { CustomerType } from 'App/Models/Customer'
import StripeEventHandler from 'App/Helpers/stripe/StripeEventHandler'

export default class TrackingController {

	public async submitTrackResult(ctx: HttpContextContract) {
		const payload = await ctx.request.validate(PostTrackingResultValidator)
		_.assign(payload, { ip: ctx.request.ip() })
		const record = await TrackResult.create(payload)
		return ctx.response.json(record)
	}

	public async getResult(ctx: HttpContextContract) {
		const tid = ctx.request.input('tid')
		const tt = ctx.request.input('tt')
		const record = await TrackResult.query()
			.where({trackId: tid, tt: tt})
			.firstOrFail()
		return ctx.response.json(record)
	}

	public async submitFixIssues(ctx: HttpContextContract) {
		const { tid, tt, ...payload } = await ctx.request.validate(FixIssuesValidator)
		const record = await TrackResult.query().where({trackId: tid, tt: tt}).firstOrFail()
		const fixingRecord = await FixIssuesLog.create({
			site: record.site,
			email: record.email,
			...payload
		})
		const product = await StripeProduct.firstOrFail()
		const session = await StripeHelper.createCheckoutSession(product.priceId, record.email, CustomerType.User, { requestId: fixingRecord.id, tt, tid, productId: product.id })
		return ctx.response.json({
			id: session.id,
			url: session.url,
			status: session.payment_status,
		})
	}

	public async webhook(ctx: HttpContextContract) {
		const payload = ctx.request.body()
		if (payload.type === 'charge.succeeded') {
			await StripeEventHandler.chargeSucceeded(payload.data?.object)
		} else if (payload.type === 'checkout.session.completed') {
			await StripeEventHandler.checkoutSessionCompleted(payload.data?.object)
		}
		ctx.response.status(204).send("")
	}


}
