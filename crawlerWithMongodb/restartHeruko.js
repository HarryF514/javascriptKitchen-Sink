var exec = require('child_process').exec;

setInterval(function() {
	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getar/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle1/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle2/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle3/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle4/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle5/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle6/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle7/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle8/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle9/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

	exec('curl -n -X DELETE https://api.heroku.com/apps/getarticle10/dynos   -H "Content-Type: application/json"   -H "Accept: application/vnd.heroku+json; version=3"', function(error, stdout, stderr) {
		if (error) {
			console.log(error);
			return;
		}
		if (stdout) {
			console.log(stdout);
		}
	});

}, 10*60000);