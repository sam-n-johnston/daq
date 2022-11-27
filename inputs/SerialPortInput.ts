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
                callback(this.buffer as any);
                this.buffer = '';
            }
        });
    }
}
