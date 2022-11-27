import { SignalEvent } from './SignalEvent';
import { CSVOutput } from './outputs/CSVOutput';
import { SerialPort } from 'serialport';
import { SerialPortInput } from './inputs/SerialPortInput';

const output = new CSVOutput('./something.csv');

output.write(new SignalEvent(new Date().toISOString(), { column1: '12312' }));

const port = new SerialPort({
    path: '/dev/cu.usbserial-A700dYGM',
    baudRate: 9600,
});

const input = new SerialPortInput(port);

const startProcessing = async (): Promise<void> => {
    return new Promise((resolve) => {
        console.log(`Starting...!`);
        input.onRead((event: SignalEvent) => {
            console.log(`GOT an Event!: ${event}`);
            resolve();
        });

        setInterval(() => {}, 1000);
    });
};
(async function () {
    await startProcessing();
})();

console.log('ass');
