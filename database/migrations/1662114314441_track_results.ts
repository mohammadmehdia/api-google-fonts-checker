import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'track_results'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('email').notNullable()
			table.string('site').notNullable()
			table.json('results').nullable()
			table.string('trackId').notNullable()
			table.string('tt').notNullable()
			table.string('ip').nullable()
			table.timestamp('createdAt', { useTz: true })
			table.timestamp('updatedAt', { useTz: true })
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
