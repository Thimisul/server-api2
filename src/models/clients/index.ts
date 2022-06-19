import AgreementsType from "../agreements"

export type ClientType = {
    id?: string,
    cpf: string
    name: string
    birthday: Date
    cep: string
    street: string;
    number: string;
    district: string;
    city: string;
    complement: string
    agreement?: AgreementsType
  }

  export default ClientType