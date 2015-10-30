# metalsmith-comment-yaml
Metalsmith plugin to extract data from YAML in javascript comments.

Uses the esprima parser to scan all javascript BLOCK comments for YAML.

Each block of YAML will be added to a list and set on your global metadata.

This can be used, for example, to easily generate documentation from structured YAML in javascript block comments.

## Usage

#### Install
```bash
npm install metalsmith-comment-yaml
```

#### API
```javascript
var commentYaml = require('metalsmith-comment-yaml');
metalsmith.use(commentYaml({
  "globalMetadataVariableName" : "path/to/javascript.js"
}));
```

#### CLI (metalsmith.json)
```json
{
  "plugins" : {
    "metalsmith-comment-yaml" : {
      "globalMetadataVariableName" : "path/to/javascript.js"
    }
  }
}
```

## Example

#### library.js
```javascript

// All line comments are ignored

/*
  Also, this block comment is ignored because it doesn't start with the YAML "---"
*/

/*
  ---
  methodName  : methodOne
  description : Simple function
  arguments   :
    - argumentName : str
*/
function methodOne(str){
  return "hello, " + str;
}

```

#### docs.jade
```jade
for doc in documentation
  h1 #{doc.methodName}
  p.description #{doc.description}

  h3 Arguments
  ul
    for arg in doc.arguments
      li #{arg.argumentName}
```

#### metalsmith.json
```json
{
  "plugins" : {
    "metalsmith-comment-yaml" : {
      "documentation" : "library.js"
    }
    , ...
  }
}
```

## License

Apache-2.0