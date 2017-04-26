/**
 * Created by mafessel on 19/04/2017.
 */
var configValues = require('./config');

module.exports = {

    getDbConnectionString: function () {
        return 'mongodb://' + configValues.log + ':' + configValues.pwd + '@ds139989.mlab.com:39989/ambassadeur';
    }
}