types     = require('ast-types');
recast    = require('recast');
fs        = require('fs');
yaml      = require('js-yaml');
yamlRegex = /^(---)/;

function getCommentYamls(contents){
  var yamls = [];

  // Parse javascript file
  var ast = recast.parse(contents);

  // Extract YAML data
  types.visit(ast, {
    visitComment : function(path){
      this.traverse(path);
      if (types.namedTypes.Block.check(path.value)) {
        // Look for YAML "---"
        content = path.value.value.trim();
        if (yamlRegex.test(content)) {
          // Parse YAML
          obj = yaml.safeLoad(content);
          yamls.push(obj);
        }
      }
    }
  });
  return yamls;
}

module.exports = function(options) {
  return function(files, metalsmith, done) {
    // Iterate over config. Values will be javascript paths
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        path = metalsmith.path(options[key]);
        metalsmith.metadata()[key] = getCommentYamls(fs.readFileSync(path, 'utf8'));
      }
    }
    done();
  };
}
