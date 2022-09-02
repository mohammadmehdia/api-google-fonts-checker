import Customer, { CustomerType } from 'App/Models/Customer'

export default interface StripeHelperInterface {

	getCustomerByEmail(email: string, type: CustomerType): Promise<Customer>
	createStripeCustomer(email: string, type: CustomerType): Promise<Customer>
}
