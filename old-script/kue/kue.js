var kue = require('kue')
    , queue = kue.createQueue();
// create our job queue
queue.on( 'error', function( err ) {
    console.log( 'Oops... ', err );
});
var jobs = kue.createQueue();

// one minute

var minute = 60000;




var email = jobs.create( 'email', {
    title: 'Account expired'
} ).delay( minute )
    .priority( 'high' )
    .save();

//setInterval(function(){
//    jobs.create( 'email', {
//        title: 'Account expired', to: 'tj@learnboost.com', template: 'expired-email'
//    } ).delay( minute )
//        .priority( 'high' )
//        .save();
//},1000)

email.on( 'promotion', function () {
    console.log( 'renewal job promoted' );
} );

email.on( 'complete', function () {
    console.log( 'renewal job completed' );
} );

jobs.process( 'email', function ( job, done ) {
    done();
});


// start the UI
kue.app.listen( 3013 );
console.log( 'UI started on port 3013' );
