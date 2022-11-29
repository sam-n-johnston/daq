export type SignalEventData = { [key: string]: any };

export class SignalEvent {
    constructor(
        public readonly occuredAt: string,
        public readonly data: SignalEventData
    ) {}
}
