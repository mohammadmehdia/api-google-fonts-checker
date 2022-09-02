import type { EventsList } from '@ioc:Adonis/Core/Event'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class TrackingEventListener {

	// @ts-ignore
	public async onResultSubmitted(trackResult: EventsList['tracking:submitted']) {
		console.log('tracking:submitted', trackResult.toJSON())
		try {
			await Mail.use('smtp').sendLater((message) => {
				message.from(Env.get('SMTP_USERNAME'))
				message.to(trackResult.email)
				message.subject("Your Issues Submitted")
				message.htmlView('emails/track_result_submitted', {
					link: "https://neichmocher.at",
				})
			})
		} catch (err) {}
	}

}
