import requests
def send_simple_message():
	return requests.post(
		"https://api.mailgun.net/v3/sandbox2abd532106654910aca06b63e6b4d46d.mailgun.org/messages",
		auth=("api", "c053bfc0c16dc4f497192184e35cff4b-f135b0f1-542b57b9"),
		data={"from": "Excited User <Avery@https://api.mailgun.net/v3/sandbox2abd532106654910aca06b63e6b4d46d.mailgun.org>",
			"to": "averyclariday44@gmail.com",
			"subject": "Mailgun Test",
			"text": "Testing Mailgun"
			})