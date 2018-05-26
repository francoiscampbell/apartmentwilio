# apartmentwilio
Apartment lobby door automation

## Use this as a Twilio serverless function

1. Add the package to your Functions environment: https://www.twilio.com/console/runtime/functions/configure
2. Create a new Twilio Function: https://www.twilio.com/console/runtime/functions/manage
3. Set your handler:

```js
const apartmentwilio = require('apartmentwilio')

exports.handler = apartmentwilio({
	sms: {  // Send an SMS when the lobby door is unlocked (optional)
		from: '+1234567890'  // Your Twilio to send from
		to: ['+1234567890']  // Numbers to send to
		text: 'From door buzzer opened'  // Text to send as SMS (optional; defaults to "🚪 There's someone at the door 🚪")
	},
	unlockDigits: '9'  // The number you'd dial if you were unlocking the lobby door manually
})
```


