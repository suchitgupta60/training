const rp = require('request-promise');
/**
 * Create a new user on the bloc-server and print the address of the newly
 * created account for that user. If a user with this name already exists it
 * will create another account for the user and print this address.
 */

var blocUrl = 'http://localhost/bloc/v2.1'; //same url of our bloc-server used in config.yaml
var stratoUrl = 'http://localhost/strato-api'; //url of the strato instance that is running the blockchain, same as in config.yaml

var userName = 'alice';
var createUserPayload = '1234';

var options = {
    method: 'POST',
    uri: blocUrl + '/users/' +  userName + '?faucet=true',
    body: createUserPayload,
    json: true // Automatically stringifies the body to JSON
};
rp(options).then(function(address){
  console.log('New address of ' + userName + ' is:', address);

  /**
   * Now we will log the details of the newly created account on the blockchain.
   * We simply pass in the address of the account we would like.
   */
  rp(stratoUrl + '/eth/v1.2/account?address=' + address).then((accounts) => {
    const account = accounts[0]
    console.log('Account balance is : ', account.balance);
  })
}).catch(function(err){
  console.log('an error occurred: ', err);
});
