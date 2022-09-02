import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'fix_issues_logs'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('site').notNullable()
			table.string('email').notNullable()
			table.string('ftpHost').notNullable()
			table.string('ftpUsername').notNullable()
			table.string('ftpPassword').notNullable()
			table.string('description').nullable()
			table.boolean('paid').defaultTo(false)
			table.string('customerId').nullable()
			table.timestamp('createdAt', { useTz: true })
			table.timestamp('updatedAt', { useTz: true })
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
