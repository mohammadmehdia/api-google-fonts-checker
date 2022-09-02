import Stripe from '@ioc:Adonis/Addons/Stripe'
import StripeProduct from 'App/Models/StripeProduct'

export default class StripeProductHelper {

	private static async deactivateProduct(code: string) {
		const list = await Stripe.products.list({active: true})
		const product = list.data?.find(x => x.name === code)
		if(product) {
			await Stripe.products.update(product.id, {active: false})
			const prices = await Stripe.prices.list({product:product.id, active:true})
			for(let price of prices.data) {
				await Stripe.prices.update(price.id, {active: false})
			}
			await StripeProduct.query().where('code', code).delete()
		}
	}

	public static async createProduct(productTitle: string, code: string, amount: number) {
		await this.deactivateProduct(code)

		const product = await Stripe.products.create({
			name: code,
			description: productTitle,
			metadata: { code },
		})
		const price = await Stripe.prices.create({
			product: product.id,
			unit_amount: amount,
			currency: 'eur',
			nickname: productTitle,
			metadata: {
				...product.metadata,
			},
		})
		return await StripeProduct.create({
			id: product.id,
			code: code,
			priceId: price.id,
			productData: product,
			priceData: price,
		})
	}


}
