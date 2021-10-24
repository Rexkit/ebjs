export interface Commands {
  [index: string]: string;
}

export interface OutputEntry {
  text: string;
}

export enum RunResult {
  SUCCESS = "success", // exit code === 0
  FAILURE = "failure", // ran, but exit code !== 0
  INVALID = "invalid", // could not run
}

export interface SetProjectOptions {
  filePath?: string;
}
