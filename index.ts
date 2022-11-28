import { SignalEvent } from './SignalEvent';
import { CSVOutput } from './outputs/CSVOutput';
import { SerialPort } from 'serialport';
import { SerialPortInput } from './inputs/SerialPortInput';

const output = new CSVOutput('./something.csv');

const port = new SerialPort({
    path: '/dev/cu.usbserial-A700dYGM',
    baudRate: 9600,
});

const input = new SerialPortInput(port);

output.writeHeader(new SignalEvent('0', { y: '0' }));

const startProcessing = async (): Promise<void> => {
    return new Promise((resolve) => {
        console.log(`Starting...!`);
        input.onRead((event: SignalEvent) => {
            console.log(`GOT an Event!: ${event}`);
            output.write(event);
            resolve();
        });

        setInterval(() => {}, 1000);
    });
};
(async function () {
    await startProcessing();
})();

console.log('ass');
