/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
 *
 * @method methodName2
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
 * @fileOverview 简单的类对象标注示例
 * @author <a href="llying.javaeye.com">llying</a>
 * @version 0.1
 */
/**
 * @author llying
 * @constructor Person
 * @description 一个Person类
 * @see The <a href="#">llying</a >.
 * @example new Parent(“张三”,15);
 * @since version 0.1
 * @param {String} username 姓名
 * @param {Num} age 年龄
 */
function Person(username,age)
{
    /**
     * @description {Sting} 姓名
     * @field
     */
    this.username = username;
    /**
     * @description {Num} 年龄
     * @field
     */
    this.age = age
    /**
     * @description 弹出say内容
     * @param {String} content 内容
     */
    this.say = function(content)
    {
        alert(this.username+" say :"+content);
    }
    /**
     * @description 返回json格式的对象
     * @return {String} json格式
     * @see Person#say
     */
    this.getJson = function(){
        return "{name:"+this.username+",age"+this.age+"}";
    }
}

/**
 * A module that says hello!
 * @module hello/world
 */

/**
 * My method description.  Like other pieces of your comment blocks,
 * this can span multiple lines.
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
 * A module that says hello!
 * @module hello2
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
 * A module that shouts hello!
 * @module hello/world
 */

/** SAY HELLO. */
module.exports = function() {
    return "HELLO WORLD";
};

/**
 * The built in string object.
 * @external String
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String}
 */

/**
 * Create a ROT13-encoded version of the string. Added by the `foo` package.
 * @function external:String#rot13
 * @example
 * var greeting = new String('hello world');
 * console.log( greeting.rot13() ); // uryyb jbeyq
 */

/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 */

/**
 * A jQuery plugin to make stars fly around your home page.
 * @function external:"jQuery.fn".starfairy
 */

/**
 * The built-in class for sending HTTP requests.
 * @external XMLHttpRequest
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */

/**
 * Extends the built-in `XMLHttpRequest` class to send data encoded with a secret key.
 * @class EncodedRequest
 * @extends external:XMLHttpRequest
 */

/**
 * External namespace for security-related classes.
 * @external security
 * @see http://example.org/docs/security
 */

/**
 * External class that provides Transport Layer Security (TLS) encryption.
 * @class TLS
 * @memberof external:security
 */


/**
 * Interface for classes that represent a color.
 *
 * @interface
 */
function Color() {}

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, and blue values,
 * in that order.
 */
Color.prototype.rgb = function() {
    throw new Error('not implemented');
};

/**
 * Class representing a color with transparency information.
 *
 * @class
 * @implements {Color}
 */
function TransparentColor() {}

// inherits the documentation from `Color#rgb`
TransparentColor.prototype.rgb = function() {
    // ...
};

/**
 * Get the color as an array of red, green, blue, and alpha values, represented
 * as decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, blue, and alpha
 * values, in that order.
 */
TransparentColor.prototype.rgba = function() {
    // ...
};