# apartmentwilio
Apartment lobby door automation

Use this as a [Twilio serverless function](https://www.twilio.com/console/runtime/functions/manage)

```js
exports.handler = apartmentwilio({
	sms: {
		from: '+1234567890'  // Your Twilio to send from
		to: ['+1234567890']  // Numbers to send to,
		text: 'From door buzzer opened'  // Text to send as SMS (optional; defaults to "🚪 There's someone at the door 🚪")
	},
	unlockDigits: '9'  // The number you'd dial if you were unlocking the lobby door manually
})
```


