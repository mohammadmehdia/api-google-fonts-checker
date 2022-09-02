import Customer, { CustomerType } from 'App/Models/Customer'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import StripeSession from 'App/Models/StripeSession'
import Env from '@ioc:Adonis/Core/Env'

export default class StripeHelper {

	public static getCustomerByEmail(email: string, type: CustomerType = CustomerType.User) {
		return Customer.query()
			.where('type', type)
			.where('email', email)
			.whereNotNull('stripeCustomerId')
			.firstOrFail()
	}

	public static createStripeCustomer(email: string, type: CustomerType) {
		return Stripe.customers.create({
			name: email,
			email: email,
			metadata: { userType: type }
		})
			.then(customer => Customer.updateOrCreate(
					{ type, email },
					{ stripeCustomerId: customer.id }
				)
			)
	}

	public static getStripeCustomer(email: string, type: CustomerType) {
		return this.getCustomerByEmail(email, type)
			.catch(_ => this.createStripeCustomer(email, type))
	}

	public static getStripeCustomerId(email: string, type: CustomerType) {
		return this.getStripeCustomer(email, type)
			.then(customer => customer.stripeCustomerId || "")
			.then(customerId => {
				if(!customerId)
					throw Error("Wrong CustomerId")
				return customerId
			})
	}

	public static createInvoiceItem(email: string, type: CustomerType, priceId: string) {
		return this.getStripeCustomerId(email, type)
			.then(customerId => Stripe.invoiceItems.create({
					customer: customerId,
					price: priceId
				}).then(invoiceItem => ({invoiceItem, customerId}))
			)
	}

	public static createInvoice(email: string, type: CustomerType, priceId: string, days_until_due: number = 7, ) {
		return this.createInvoiceItem(email, type, priceId)
			.then(data => Stripe.invoices.create({
				customer: data.customerId,
				collection_method: 'send_invoice',
				days_until_due: days_until_due,
			}))
	}


	public static createCheckoutSession(
		priceId: string,
		email: string,
		customerType: CustomerType = CustomerType.User,
		metadata?: Record<string, string|number|null>
	) {
		return this.getStripeCustomerId(email, customerType)
			.then(customerId =>
				Stripe.checkout.sessions.create({
					line_items: [ { price: priceId, quantity: 1 } ],
					metadata: metadata,
					mode: 'payment',
					customer: customerId,
					success_url: Env.get('PAYMENT_SUCCESS_URL'),
					cancel_url: Env.get('PAYMENT_CANCEL_URL'),
				}).then(session =>
					StripeSession.updateOrCreate({id: session.id}, {
						amountSubtotal: session.amount_subtotal,
						amountTotal: session.amount_total,
						currency: session.currency,
						customerId: customerId,
						customerEmail: session.customer_email,
						customerDetails: session.customer_details,
						metadata: session.metadata,
						mode: session.mode,
						liveMode: session.livemode,
						paymentStatus: session.payment_status,
						status: session.status,
						totalDetails: session.total_details,
						url: session.url,
					})
						.then(_ => session)
						.then(_ => session)
				)
			)
	}


}
