export interface ResponseUpload {
  message: string;
  status: string;
  data: Data;
}

export interface Data{
  transactionDtos: TransactionsDtos[]
}
export interface TransactionsDtos{
  "type":string,
  "value": number,
  "accountOrigin": string,
  "accountDestination": string;
}
