export interface Log {
  [ k: string ]: any;
  v
  msg
  err
  level
  name
  hostname
  pid
  time
}

export class Logger {
  log(data: Log) {
    console.log()
  }
}