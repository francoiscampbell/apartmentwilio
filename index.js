function invariant(condition, errorMessage) {
	if (!condition) {
		throw new Error(errorMessage)
	}
}

function getOptions(providedOptions) {
	const smsTo = options.smsTo
	invariant(Array.isArray(smsTo), 'options.smsTo must be an Array')

	const smsFrom = options.smsFrom
	invariant(!!smsTo === !!smsFrom, 'options.smsTo and options.smsFrom must both be specified')

	const smsText = options.smsText || "🚪 There's someone at the door 🚪"
	
	const unlockDigits = options.unlockDigits
	invariant(typeof unlockDigits === 'string', 'options.unlockDigits must be a string')
	
	if (smsFrom && smsTo && smsText) {
		return {
			sms: {
				from: smsFrom,
				text: smsText,
				to: smsTo,
			},
			unlockDigits
		}
	}

	return {
		unlockDigits
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

module.exports = function(options) {
	const unlockDigits = options.unlockDigits
	invariant(typeof unlockDigits === 'string', 'options.unlockDigits must be a string')

	const smsOptions = options.smsTo
	if (smsOptions) {
		invariant(Array.isArray(sms.to), 'options.sms.to must be an Array')
		invariant(!!smsTo === !!smsFrom, 'options.sms.to and options.sms.from must both be specified')
		const smsText = options.sms.text || "🚪 There's someone at the door 🚪"
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