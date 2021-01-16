/* eslint-disable functional/no-expression-statement */
import Transport, { TransportStreamOptions } from "winston-transport";

export default class NullTransport extends Transport {
  public constructor(options: TransportStreamOptions) {
    super(options);
  }

  public log(
    info: readonly unknown[],
    callback: { (transport: NullTransport): void },
  ): readonly unknown[] {
    callback(this);
    return info;
  }
}
