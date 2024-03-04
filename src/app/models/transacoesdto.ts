export interface Transacoesdto{
  id?:number;
  company: Company;
  accountOrigin: string;
  accountDestination: string;
  type: string;
  value: number;

}

interface Company{
  id?:number;
  companyName: string;
  companyId: string;
}
