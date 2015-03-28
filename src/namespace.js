var path = require('path');

function namespace () {
}
 
/**
 * Namespaces collection
 *
 * @var {Array}
 */
namespace.prototype.namespaces = [];

/**
 * Configures the namespace system
 *
 * @param {Object} config
 */
namespace.prototype.configure = function (config) {
    if (!config.dir) {
        throw('Directory not defined on configurations');
    }

    this.dir = config.dir;
};

/**
 * Adds some namespace
 *
 * @param {String} namespace
 * @param {String} path
 */
namespace.prototype.add = function (namespace, path) {
    this._verifyConfigs();
    this.namespaces.push({namespace: namespace, path: path});
};

/**
 * Requires some module based on a namespace
 *
 * @param {String} module
 * @return {mixed}
 */
namespace.prototype.use = function (module) {
    this._verifyConfigs();
    var possibles = [];

    this.namespaces.forEach(function (ns) {
        if (module.substr(0, ns.namespace.length) == ns.namespace) {
            possibles.push(ns);
        }
    });

    if (possibles.length > 0) {
        possibles.sort(function (a, b) {
            return b.namespace.length - a.namespace.length;
        });
        var ns = possibles[0];

        var newpath = path.join(this.dir, ns.path, module.substr(ns.namespace.length));
        newpath = newpath.replace("/", '\\');
        return require(newpath);
    }

    throw (module + ' is not a valid module.');
};

namespace.prototype._verifyConfigs = function () {
    if (typeof this.dir === undefined) {
        throw('Directory not defined on configurations');
    }
};

namespace.prototype._clean = function () {
    this.namespaces = [];
};

namespace.instance = null;

/**
 * One single instance from namespace
 *
 * @return namespace
 */
namespace.getInstance = function () {
    if (this.instance === null) {
        this.instance = new namespace();
    }

    return this.instance;
};

module.exports = namespace.getInstance();