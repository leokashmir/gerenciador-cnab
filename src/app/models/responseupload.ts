export interface ResponseUpload {
  message: string;
  status: string;
  data: Data;
}

export interface Data{
  transactions: Transactions[]
}
export interface Transactions{
  "type":string,
  "value": number,
  "accountOrigin": string,
  "accountDestination": string;
}
