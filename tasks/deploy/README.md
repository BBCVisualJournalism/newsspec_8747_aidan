# Deployment
This code allows you to configure a project to a specific server environment, then deploy to that environment. It takes a folder of files, replaces parts of the file contents (e.g. local.com => example.com) then deploys the changed files to a specific location, all without changing the original files. In this way, you can have one common project and deploy it to multiple environments.

# Directory structure

* bin/ - contains framework-specific configuration. For now, this is just grunt (`grunt.js`) but could support additional configuration files for Gulp, pure Node, etc.
* lib/ - contains the pure Node encapsulating the business logic of the module. This is called by the configuration files in `bin/`.
* test/ - contains unit tests for our Node.

# Running tests

## Run just these tests

Run tests directly (from iFS project root) as follows:

`node_modules/.bin/vows tasks/deploy/test/vows.js --verbose`

Having tests executable directly from within `/deploy` gives us the freedom to extract this module out into its own repository in future.

## Run all tests

As the deploy task is currently baked into the scaffold rather than in its own repo, we needed to expose the VowJS hooks to the iFS test suite. As such, the tests can be added to a larger test suite as follows:

```
var vows = require('vows');
var deployTests = require('/path/to/this/test/file')();

vows.describe('Deploy unit tests')
    .addBatch(deployTests)
    // keep adding batches as necessary
    .export(module);
```

This is seen in `tests/node/tests/modules.js`.