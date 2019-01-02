const Homey = require('homey');

module.exports = class SonoffRFSensorApp extends Homey.App {
  onInit() {
    this.log('SonoffRFSensorApp is running...');

    let signal = new Homey.Signal433('sonoff_door_sensor');
    signal.register().then( () => {
      // on a payload event
      signal.on('payload', function(payload, first){
        let code = parseInt(payload.join(''), 2);
        let id   = (code >> 4) & 0xfffff; // 20 bits identifier
        let d3   = !! (code & 0x01);
        let d2   = !! (code & 0x02);
        let d1   = !! (code & 0x04);
        let d0   = !! (code & 0x08);
        console.log('received from a device:', payload, 'isRepetition:', !first);
        console.log(`code = ${ code }, id = ${ id }, d0 = ${ d0 }, d1 = ${ d1 }, d2 = ${ d2 }, d3 = ${ d3 }`);
      });

      // on a command event
      signal.on('cmd', function( cmdId, first ){
        console.log('received a command from a device:', cmdId, 'isRepetition:', !first);
      });
    }).catch( this.error )
  }
}
