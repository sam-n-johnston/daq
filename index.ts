import { SignalEvent } from './SignalEvent';
import { CSVOutput } from './outputs/CSVOutput';
import { SerialPort } from 'serialport';
import { SerialPortInput } from './inputs/SerialPortInput';

const output = new CSVOutput('./something.csv');

const port = new SerialPort({
    path: '/dev/cu.usbserial-A700dYGM',
    baudRate: 9600,
});

const keys = [
    'orientationX',
    'orientationy',
    'orientationZ',

    'angVelocityX',
    'angVelocityy',
    'angVelocityZ',

    'linearyAccelX',
    'linearyAccely',
    'linearyAccelZ',

    'magnetometerX',
    'magnetometery',
    'magnetometerZ',

    'accelerometerX',
    'accelerometery',
    'accelerometerZ',

    'gravityX',
    'gravityy',
    'gravityZ',
];

const input = new SerialPortInput(port);

output.writeHeader(keys);

const startProcessing = async (): Promise<void> => {
    return new Promise((resolve) => {
        console.log(`Starting...!`);
        input.onRead((event: SignalEvent) => {
            output.write(event);
            resolve();
        }, keys);

        setInterval(() => {}, 1000);
    });
};
(async function () {
    await startProcessing();
})();
