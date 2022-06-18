import { ClientsType, EmployeesType, ServicesSaloonType } from ".."

export type SchedulesType = {
    id?: string,
    client: ClientsType,
    service: ServicesSaloonType,
    employee: EmployeesType
    start: string,
    end?: string
}

export default SchedulesType