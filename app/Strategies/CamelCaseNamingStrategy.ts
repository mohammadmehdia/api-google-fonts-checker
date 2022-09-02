//import { DateTime } from 'luxon'
import { LucidModel, ModelRelations, SnakeCaseNamingStrategy } from "@ioc:Adonis/Lucid/Orm";
import { string } from '@ioc:Adonis/Core/Helpers'


// @ts-ignore
export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {

	/**
	 * The default table name for the given model
	 */
	public tableName(model: LucidModel): string {
		return string.pluralize(string.snakeCase(model.name))
	}

	/**
	 * The database column name for a given model attribute
	 */
	public columnName(_: LucidModel, attributeName: string): string {
		return string.camelCase(attributeName)
	}

	/**
	 * The post serialization name for a given model attribute
	 */
	public serializedName(_: LucidModel, attributeName: string): string {
		return string.camelCase(attributeName)
	}

	/**
	 * The local key for a given model relationship
	 */
	public relationLocalKey(
		relation: ModelRelations['__opaque_type'],
		model: LucidModel,
		relatedModel: LucidModel
	): string {
		if (relation === 'belongsTo') {
			return relatedModel.primaryKey
		}

		return model.primaryKey
	}

	/**
	 * The foreign key for a given model relationship
	 */
	public relationForeignKey(
		relation: ModelRelations['__opaque_type'],
		model: LucidModel,
		relatedModel: LucidModel
	): string {
		if (relation === 'belongsTo') {
			return string.camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`)
		}

		return string.camelCase(`${model.name}_${model.primaryKey}`)
	}

	/**
	 * Pivot table name for many to many relationship
	 */
	public relationPivotTable(_: 'manyToMany', model: LucidModel, relatedModel: LucidModel): string {
		return string.camelCase([relatedModel.name, model.name].sort().join('_'))
	}

	/**
	 * Pivot foreign key for many to many relationship
	 */
	public relationPivotForeignKey(_: 'manyToMany', model: LucidModel): string {
		return string.camelCase(`${model.name}_${model.primaryKey}`)
	}

}



