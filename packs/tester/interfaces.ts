export interface Constructor<T extends object = object> {
  new(...args: any[]): T;
}

export interface INameable {
  name: string;
}

export interface ITestCase {
  caseArguments: any[];
}
