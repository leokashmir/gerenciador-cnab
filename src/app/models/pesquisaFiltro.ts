export class PesquisaFiltro{

  companyName: string;
  companyId: string;
  accountOrigin: string;
  accountDestination: string;
  type: string;


  constructor(builder: PesquisaFiltroBuilder) {
    this.companyName = builder.companyName;
    this.companyId = builder.companyId;
    this.accountOrigin = builder.accountOrigin;
    this.accountDestination = builder.accountDestination;
    this.type = builder.type;
  }
}


export class PesquisaFiltroBuilder {

  companyName = "";
  companyId= "";
  accountOrigin= "";
  accountDestination= "";
  type= "";

  setName(companyName: string): PesquisaFiltroBuilder {
    this.companyName = companyName;
    return this;
  }
  setCompanyId(companyId: string): PesquisaFiltroBuilder {
    this.companyId = companyId;
    return this;
  }
  setAccountOrigin(accountOrigin: string): PesquisaFiltroBuilder {
    this.accountOrigin = accountOrigin;
    return this;
  }
  setAccountDestination(accountDestination: string): PesquisaFiltroBuilder {
    this.accountDestination = accountDestination;
    return this;
  }
  setType(type: string): PesquisaFiltroBuilder {
    this.type = type;
    return this;
  }

  build(): PesquisaFiltro {
    return new PesquisaFiltro(this);
  }

}
