//import { DateTime } from 'luxon'
import { BaseModel, CherryPick, ModelObject } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

import _ from 'lodash'
import Env from '@ioc:Adonis/Core/Env'

export default class CustomBaseModel extends BaseModel {

	public static namingStrategy = new CamelCaseNamingStrategy()

	public static jsonParse = (value?) => {
		try {
			return (value && _.isString(value)) ? JSON.parse(value) : null
		} catch (e){}
		return null
	}

	public static jsonStringify = (value?) => {
		try {
			return value ? JSON.stringify(value) : null
		} catch (e){}
		return null
	}

	public static transformUrl = (value?) => {
		try {
			if(value && !value.startsWith("http")) {
				const part = value.startsWith("/") ? value.substring(1) : value
				return `${Env.get('APP_URL')}/${part}`
			}
		} catch (e){}
		return value
	}

	serialize(cherryPick?: CherryPick): ModelObject {
		const obj = super.serialize(cherryPick)
		if(!_.isEmpty(this.$extras) ) {
			const $ext = _.omitBy(this.$extras, (_, key) => !key || key.startsWith('pivot'))
			if(!_.isEmpty($ext)) obj['$extras'] = $ext
		}
		return obj
	}


}
