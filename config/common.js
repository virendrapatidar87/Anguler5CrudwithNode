const dateformat = require('dateformat');

class CommonUtils {

	constructor(router) {
	  //this.getCurrnetDate();
  }

  getCurrnetDate(){

    var now = new Date();
    
  return dateformat(now, "ddmmyyyy, hh:MM:ss TT");
  }
}
module.exports = CommonUtils;