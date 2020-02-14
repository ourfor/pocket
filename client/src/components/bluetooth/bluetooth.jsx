import { useState, useEffect } from 'react'

export default function Bluetooth() {
    const [chosenHeartRateService,set] = useState(null)
    const open = () => {
      info(Bluetooth.getAvailability())
      navigator.bluetooth.requestDevice({
        // acceptAllDevices:true,
        filters: [{
          services: ['heart_rate'],
          namePrefix: 'MI6'
        }]
      }).then(device => device.gatt.connect())
      .then(server => server.getPrimaryService('heart_rate'))
      .then(service => {
        set(service)
        return Promise.all([
          service.getCharacteristic('body_sensor_location')
            .then(handleBodySensorLocationCharacteristic),
          service.getCharacteristic('heart_rate_measurement')
            .then(handleHeartRateMeasurementCharacteristic),
        ]);
      });
    }



    return <button onClick={open}>打开蓝牙</button>
}


function handleBodySensorLocationCharacteristic(characteristic) {
  if (characteristic === null) {
    console.log("Unknown sensor location.");
    return Promise.resolve();
  }
  return characteristic.readValue()
  .then(sensorLocationData => {
    const sensorLocation = sensorLocationData.getUint8(0);
    switch (sensorLocation) {
      case 0: return 'Other';
      case 1: return 'Chest';
      case 2: return 'Wrist';
      case 3: return 'Finger';
      case 4: return 'Hand';
      case 5: return 'Ear Lobe';
      case 6: return 'Foot';
      default: return 'Unknown';
    }
  }).then(location => console.log(location));
}

function handleHeartRateMeasurementCharacteristic(characteristic) {
  return characteristic.startNotifications()
  .then(char => {
    characteristic.addEventListener('characteristicvaluechanged',
                                    onHeartRateChanged);
  });
}

function onHeartRateChanged(event) {
  const characteristic = event.target;
  console.log(parseHeartRate(characteristic.value));
}