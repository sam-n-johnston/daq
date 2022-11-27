import { SignalEvent } from '../SignalEvent';

export interface Input {
    onRead: (callback: (event: SignalEvent) => void) => void;
}
