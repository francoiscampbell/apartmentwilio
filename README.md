# apartmentwilio
Apartment lobby door automation

## Use this as a Twilio serverless function

1. Add the package to your Functions environment and enable ACCOUNT_SID and AUTH_TOKEN: https://www.twilio.com/console/runtime/functions/configure (you may have to hit Save twice, make sure the deployed banner appears)
2. Create a new Twilio Function: https://www.twilio.com/console/runtime/functions/manage
3. Set your handler:

```js
const apartmentwilio = require('apartmentwilio')

exports.handler = apartmentwilio({
	unlockDigits: '9',  // The number you'd dial if you were unlocking the lobby door manually
	sms: {  // Send an SMS when the lobby door is unlocked (optional)
		from: '+1234567890'  // Your Twilio to send from
		to: ['+1234567890']  // Numbers to send to
		text: 'Front door buzzer opened'  // Text to send as SMS (optional; defaults to "🚪 There's someone at the door 🚪")
	}
})
```


