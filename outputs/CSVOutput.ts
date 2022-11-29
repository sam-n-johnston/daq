import { Output } from './Output';
import fs from 'fs';
import { SignalEvent } from '../SignalEvent';

export class CSVOutput implements Output {
    constructor(private readonly outputPath: string) {}

    async writeHeader(keys: string[]): Promise<void> {
        const outputLine = `occuredAt,${keys.join(',')}\n`;

        fs.writeFileSync(this.outputPath, outputLine, { flag: 'a' });
    }

    async write(event: SignalEvent): Promise<void> {
        const outputLine = `${event.occuredAt},${Object.values(event.data).join(
            ','
        )}\n`;

        fs.writeFileSync(this.outputPath, outputLine, { flag: 'a' });
    }
}
