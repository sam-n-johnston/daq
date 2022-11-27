export class SignalEvent {
    constructor(
        public readonly occuredAt: string,
        public readonly data: { [key: string]: any }
    ) {}
}
