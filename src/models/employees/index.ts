import ServicesSaloonType from "../servicesSaloon";

export type EmployeesType = {
    id?: string,
    cpf: string,
    name: string,
    birthday: Date,
    services: ServicesSaloonType[]
  };

  export default EmployeesType