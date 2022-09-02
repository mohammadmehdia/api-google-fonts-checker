/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'

Event.on('tracking:submitted', 'TrackingEventListener.onResultSubmitted')

// Event.on('db:query', Database.prettyPrint)
