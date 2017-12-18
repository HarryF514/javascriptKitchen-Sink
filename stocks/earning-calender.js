var request = require('request');

request.get('https://www.bloomberg.com/markets/api/calendar/earnings/US?locale=en&date=2017-12-20', function (e, r, b) {
	console.log('body', JSON.parse(b));
});