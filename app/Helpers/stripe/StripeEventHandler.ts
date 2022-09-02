import StripeSession from 'App/Models/StripeSession'
import StripeProduct from 'App/Models/StripeProduct'
import FixIssuesLog from 'App/Models/FixIssuesLog'

export default class StripeEventHandler {


	public static async chargeSucceeded(object: Record<string, any>) {
		console.log("chargeSucceeded -> ", object.id)
	}


	public static async checkoutSessionCompleted(object: Record<string, any>) {
		console.log("checkoutSessionCompleted -> ", object.id, object.payment_status)
		const sessionId = object['id'] ?? ""
		if(object.payment_status !== 'paid') return
		try {
			const stripeSession = await StripeSession.query()
				.where('id', sessionId)
				.whereNot('paymentStatus', 'paid')
				.preload('customer')
				.first()

			const stripeProduct = await StripeProduct.find(stripeSession?.metadata?.productId ?? 0)
			if(!stripeProduct) return
			if(stripeSession) {
				stripeSession.merge({
					status: object.status ?? stripeSession.status,
					paymentStatus: object.payment_status ?? stripeSession.paymentStatus,
				})
				const rid = stripeSession?.metadata?.requestId ?? 0
				const issueLog = await FixIssuesLog.find(rid)
				await issueLog?.merge({ paid: true })?.save()?.catch(undefined)

				if(stripeSession.$isDirty) {
					await stripeSession.save().catch(undefined)
				}
				// await Event.emit('checkout:completed', {requestId: rid, checkoutSessionId: stripeSession.id } )
			}
		} catch (_) {}
	}

}
