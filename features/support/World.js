

function World() {
  this.driver; // this.driver will be available in step definitions

   this.timeout = setTimeout(function() {}, 60 * 1000);
   
   this.getDriver = function () {
    return this.driver;
  };

  this.setDriver = function (driver) {
    this.driver = driver;
  };


}

module.exports = function() {
  this.World = World;
};