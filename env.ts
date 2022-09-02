/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
	HOST: Env.schema.string({ format: 'host' }),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	APP_NAME: Env.schema.string(),
	DRIVE_DISK: Env.schema.enum(['local'] as const),
	NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
	DB_CONNECTION: Env.schema.string(),
	MYSQL_HOST: Env.schema.string({ format: 'host' }),
	MYSQL_PORT: Env.schema.number(),
	MYSQL_USER: Env.schema.string(),
	MYSQL_PASSWORD: Env.schema.string.optional(),
	MYSQL_DB_NAME: Env.schema.string(),
	SMTP_HOST: Env.schema.string(),
	SMTP_PORT: Env.schema.number(),
	SMTP_USERNAME: Env.schema.string(),
	SMTP_PASSWORD: Env.schema.string(),
	STRIPE_PUBLISHABLE_KEY: Env.schema.string.optional(),
	STRIPE_SECRET_KEY: Env.schema.string.optional(),
	STRIPE_API_VERSION: Env.schema.string.optional(),
	WEBSITE_URL: Env.schema.string({format: 'url'}),
	PAYMENT_SUCCESS_URL: Env.schema.string({format: 'url'}),
	PAYMENT_CANCEL_URL: Env.schema.string({format: 'url'}),
	PRODUCT_TITLE: Env.schema.string.optional(),
	PRODUCT_CODE: Env.schema.string.optional(),
	PRODUCT_PRICE: Env.schema.number.optional(),
})
