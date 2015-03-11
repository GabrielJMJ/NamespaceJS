function namespace () {
}
 
/**
 * Namespaces collection
 *
 * @var {Array}
 */
namespace.prototype.namespaces = [];
 
/**
 * Adds some namespace
 *
 * @param {String} namespace
 * @param {String} path
 */
namespace.prototype.add = function (namespace, path) {
    this.namespaces.push({namespace: namespace, path: path});
}

/**
 * Requires some module based on a namespace
 *
 * @param {String} module
 * @return {mixed}
 */
namespace.prototype.use = function (module) {
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
        var newpath = ns.path + module.substr(ns.namespace.length).replace('\\', '/');
        return require(newpath);
    }

    throw (module + ' is not a valid module.');
}

namespace.instance = null;

/**
 * One single instance from namespace
 *
 * @return namespace
 */
namespace.getInstance = function () {
    if (this.instance == null) {
        this.instance = new namespace;
    }

    return this.instance;
}

module.exports = namespace.getInstance();