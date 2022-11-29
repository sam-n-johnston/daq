import { SerialPort } from 'serialport';
import { SignalEvent, SignalEventData } from '../SignalEvent';
import { Input } from './Input';

export class SerialPortInput implements Input {
    private buffer: string = '';

    constructor(private readonly port: SerialPort) {}

    onRead(callback: (event: SignalEvent) => void, keys: string[]): void {
        this.port.on('readable', () => {
            this.buffer = this.buffer + this.port.read();

            if (this.buffer[this.buffer.length - 1] === '\n') {
                const bufferWithoutNewline = this.buffer.substring(
                    0,
                    this.buffer.length - 1
                );
                const rawData = bufferWithoutNewline.split(',');
                const occuredAt = rawData[0];
                const data: SignalEventData = {};
                keys.map((key, index) => {
                    data[key] = rawData[index + 1];
                });

                const event = new SignalEvent(occuredAt, data);

                callback(event);
                this.buffer = '';
            }
        });
    }
}
