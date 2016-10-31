/**
 * Created by cantgetnosleep on 10/6/16.
 */


var validatePhoneNumber = function (phoneNum) {
  return /^\d{3}-\d{3}-\d{4}$/.test(phoneNum);
}

var normalizePhoneNumber = function(phoneNum) {

  // strip whitespace
  phoneNum = phoneNum.replace(/ /g,'');

  if (/\d{10}/.test(phoneNum)) {

    var areaCode = phoneNum.substring(0,3);
    var firstThree = phoneNum.substring(3,6);
    var lastFour = phoneNum.substring(6,10);

    return `${areaCode}-${firstThree}-${lastFour}`;

  }
  else if (/\(\d{3}\)\d{3}-\d{4}/.test(phoneNum)) {
    var areaCode = phoneNum.substring(1,4);
    var firstThree = phoneNum.substring(5,8);
    var lastFour = phoneNum.substring(9,14);

    return `${areaCode}-${firstThree}-${lastFour}`;
  }
  else {
    return phoneNum;
  }

}

const phoneTypes = ['cell', 'home', 'business', 'personal'];

module.exports = {
  validatePhoneNumber: validatePhoneNumber,
  normalizePhoneNumber: normalizePhoneNumber,
  phoneTypes: phoneTypes
}