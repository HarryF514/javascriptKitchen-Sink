/**
 * A module that says hello!
 * @module talent达人 daren
 */

/**
 *获取达人列表
 *
 * @method sayHello
 * @param {String} foo2 Argument 1
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

/**
 * 达人接口
 * @module module2
 */

/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @method sayHello2
 * @param {String} foo2 Argument 1
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

/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @method saysth
 * @param {String} foo2 Argument 1
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