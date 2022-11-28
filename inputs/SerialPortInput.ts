import { SerialPort } from 'serialport';
import { SignalEvent } from '../SignalEvent';
import { Input } from './Input';

export class SerialPortInput implements Input {
    private buffer: string = '';

    constructor(private readonly port: SerialPort) {}

    onRead(callback: (event: SignalEvent) => void): void {
        this.port.on('readable', () => {
            this.buffer = this.buffer + this.port.read();

            if (this.buffer[this.buffer.length - 1] === '\n') {
                const rawData = this.buffer.split(',');
                const occuredAt = rawData[0];
                const data = {
                    y: rawData[1],
                };
                const event = new SignalEvent(occuredAt, data);

                callback(event);
                this.buffer = '';
            }
        });
    }
}
