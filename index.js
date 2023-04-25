const { stderr } = require('process');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function writeCliMessage( version ) {
  const { stdout } = await exec(`${ version }`);
  return stdout;
}

const versionArray = [ "docker -v", "git --version", "npm -v", "nvm -v", "node -v"]; 


Promise.all( versionArray.map( item => {  return writeCliMessage(item); }) ).then( value => {
  value.forEach( (element, index) => {
    console.log(` ${versionArray[index]} version is: ${element}`);
  });
  }, reason => {
    console.log(reason);
    process.exit(reason.code)
});
