import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class  extends BaseSchema {
	protected tableName = 'subscriptions'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('title').notNullable()
			table.string('code').nullable()
			table.string('stripeCustomerId').nullable()
			table.bigInteger('userId').unsigned().nullable()
			table.bigInteger('companyId').unsigned().nullable()
			table.date('startDate').notNullable()
			table.date('endDate').notNullable()
			table.json('metadata').nullable()
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
