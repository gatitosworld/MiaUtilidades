const events = require("events");

const manager = new class Manager extends events {

 constructor() {
  super()
  this.availableChannels = {}
 }

 post(channel, data) {
   this.availableChannels[channel] = data;
   this.emit(channel, data);
}

 get(channel) {
return this.availableChannels[channel];
  }

}

module.exports = manager;