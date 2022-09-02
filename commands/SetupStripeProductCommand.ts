import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from '@ioc:Adonis/Core/Env'
import StripeProduct from 'App/Models/StripeProduct'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import StripeProductHelper from 'App/Helpers/stripe/StripeProductHelper'
import _ from 'lodash'

export default class SetupStripeProductCommand extends BaseCommand {
	/**
	 * Command name is used to run the command
	 */
	public static commandName = 'stripe:product'

	/**
	 * Command description is displayed in the "help" output
	 */
	public static description = 'Setup stripe products from config'

	public static settings = {
		/**
		 * Set the following value to true, if you want to load the application
		 * before running the command. Don't forget to call `node ace generate:manifest`
		 * afterwards.
		 */
		loadApp: true,

		/**
		 * Set the following value to true, if you want this command to keep running until
		 * you manually decide to exit the process. Don't forget to call
		 * `node ace generate:manifest` afterwards.
		 */
		stayAlive: false,
	}

	public async run() {
		this.logger.info('Setting up Stripe Product!')
		const productTitle = Env.get('PRODUCT_TITLE') ?? "GoogleFontChecker"
		const productCode = Env.get('PRODUCT_CODE') ?? "GFontChecker"
		const productPrice = Env.get('PRODUCT_PRICE') ?? 99
		const stripeProduct = StripeProduct.findBy('code', productCode)
		const amount = 100 * productPrice
		if(!stripeProduct) {
			await this.createProduct(productTitle, productCode, amount)
		} else {
			const list = await Stripe.products.list({ active: true }).catch(undefined)
			const exists = list && !_.isEmpty(list.data) && _.findIndex(list.data, it => it.name === productCode) >= 0
			if(!exists) {
				await this.createProduct(productTitle, productCode, amount)
			}
		}
		this.logger.info('Setup --> Done')
		console.log('Stripe Products -->')
		const list = await Stripe.products.list({ active: true }).catch(undefined)
		console.log(list.data?.map(x => x.name))
	}

	private async createProduct(title: string, code: string, amount: number) {
		await StripeProductHelper.createProduct(title, code, amount)
	}

}
