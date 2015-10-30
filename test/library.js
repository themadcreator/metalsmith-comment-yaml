
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