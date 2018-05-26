function invariant(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage)
	}
}

function dial(digits) {
    const response = new Twilio.twiml.VoiceResponse()
	response.play({ digits })
	return response
}

function sendSms(client, body, from, tos) {
    return Promise.all(
        tos.map(to => client.messages.create({
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

	const smsOptions = options.smsTo
	if (smsOptions) {
		invariant(Array.isArray(sms.to), 'options.sms.to must be an Array')
		invariant(!smsTo === !smsFrom, 'options.sms.to and options.sms.from must both be specified')
		const smsText = options.sms.text || defaultSmsText
		return function(context, event, callback) {
		    const client = context.getTwilioClient()
		    sendSms(client, smsText, sms.from, sms.to)
		        .then(() => {
		            callback(null, dial(unlockDigits))
		        })
		}
	}
	
	return function(context, event, callback) {
	    callback(null, dial(unlockDigits))
	}
}