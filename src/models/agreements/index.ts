import ServicesSaloonType from "../servicesSaloon";

export type AgreementsType = {
    id?: string;
    fantasyName: string,
    corporateName: string
    cnpj: string
    discount: number,
    city: string,
    state: string,
    street: string,
    cep: string,
    number: string,
    complement: string,
    district: string,
    services: ServicesSaloonType[]
  }

  export default AgreementsType