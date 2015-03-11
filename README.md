NamespaceJS
===========
Use namespaces with NodeJS.

## Usage
On your app, add the namespaces:
```js
var ns = require('namespacejs');

ns.add('MyApplication\\', 'modules/application');
```
and in every file your can use like this:
```js
var ns = require('namespacejs')
  , usersController = ns.use('MyApplication\\Controller\\Users');
```
instead
```js
var usersController = require('modules/application/controller/users');
```