import SchedulesType from "../schedules";

export type CashiersType = {
    id?: string;
    schedule: SchedulesType
    price?: number,
    date?: string,
    status: 'AGENDADO' | 'ABERTO' | 'PAGO'
  }
  
  export default CashiersType