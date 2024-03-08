export class ResponseErroUpload{
  status!: string
  message!: string
  erros: Erros[] = []
}
export class Erros{
  line!: string;
  error!: string;
}
