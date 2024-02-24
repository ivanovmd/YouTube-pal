

interface IBaseIcpCommunicationUnit {
  namespace: string;
  eventName: string;
  communicationFn: (...a: any) => any;
  registerCommunicationFn(...a: any): void;
}

export class BaseIcpCommunicationUnit implements IBaseIcpCommunicationUnit {
  namespace: string;
  eventName: string;
  communicationFn: (...a: any) => any;

  constructor(namespace: string, eventName: string) {
    this.namespace = namespace;
    this.eventName = eventName;
  }

  registerCommunicationFn(...a: any) {
    throw new Error("Method not implemented.");
  }

  getCommunicationFn() {
    return this.communicationFn;
  }
}