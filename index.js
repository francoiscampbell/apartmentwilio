function invariant(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage)
	}
}

function getDialResponse(digits) {
    const response = new Twilio.twiml.VoiceResponse()
	response.play({ digits })
	return response
}

function sendSms(twilioClient, body, from, tos) {
    return Promise.all(
        tos.map(to => twilioClient.messages.create({
            from,
            to,
            body
        }))
    )
}

const defaultSmsText = "🚪 There's someone at the door 🚪"

module.exports = function(options) {
	const unlockDigits = options.unlockDigits
	invariant(typeof unlockDigits === 'string', 'options.unlockDigits must be a string')

	const smsOptions = options.sms
	if (smsOptions) {
		invariant(Array.isArray(smsOptions.to), 'options.sms.to must be an Array')
		invariant(!smsOptions.to === !smsOptions.from, 'options.sms.to and options.sms.from must both be specified')
		const smsText = smsOptions.text || defaultSmsText

		return function(context, event, callback) {
		    const client = context.getTwilioClient()
		    sendSms(client, smsText, smsOptions.from, smsOptions.to)
		        .then(() => {
		            callback(null, getDialResponse(unlockDigits))
		        })
		}
	}
	
	return function(context, event, callback) {
	    callback(null, getDialResponse(unlockDigits))
	}
}