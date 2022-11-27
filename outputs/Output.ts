import { SignalEvent } from '../SignalEvent';

export interface Output {
    write: (event: SignalEvent) => Promise<void>;
}
