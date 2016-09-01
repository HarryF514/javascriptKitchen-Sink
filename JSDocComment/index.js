/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @method methodName
 * @param {String} foo Argument 1
 * @param {Object} config A config object
 * @param {String} config.name The name on the config object
 * @param {Function} config.callback A callback function on the config object
 * @param {Boolean} [extra=false] Do extra, optional work
 * @return {Boolean} Returns true on success
 */
AV.Cloud.define('rpcGetTodo', function(request, response) {
    var query = new AV.Query('Todo');
    query.include("category");
    query.find().then(function (todos) {
        response.success(todos);
    }, function (error) {
    });
});