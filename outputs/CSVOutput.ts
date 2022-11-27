import { Output } from './Output';
import fs from 'fs';
import { SignalEvent } from '../SignalEvent';

export class CSVOutput implements Output {
    constructor(private readonly outputPath: string) {}

    async write(event: SignalEvent): Promise<void> {
        const outputLine = `${event.occuredAt},${Object.values(event.data).join(
            ','
        )}`;

        fs.writeFileSync(this.outputPath, outputLine, { flag: 'a' });
    }
}
