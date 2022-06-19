import faker from '@faker-js/faker/locale/pt_BR';
import { AgreementsType, CashiersType, ClientsType, EmployeesType, SchedulesType, ServicesSaloonType } from './models';
const fs = require("fs");
import { parseISO } from 'date-fns'



/* Generate Variable */
// const generateVariable = (number: number) => {
//     const Variable = [];
//     for(let  i = 0; i< number; i++){
//         Variable.push({
//             id: faker.unique(faker.database.mongodbObjectId),
//             name: faker.name.findName(),
//             thumbnail: faker.image.avatar()
//         })
//     }
//   return Variable;
// }

// Generate Variable */

const generateservicesSaloon = (servicesName: Array<string>) => {
    const servicesSaloon: ServicesSaloonType[] = [];
    const servicesDuration = [15, 30, 45, 60, 90, 105, 120]
    for (let i = 0; i < servicesName.length; i++) {
        servicesSaloon.push({
            id: faker.unique(faker.database.mongodbObjectId),
            name: servicesName[i],
            duration: servicesDuration[Math.floor(Math.random() * servicesDuration.length)],
            price: parseFloat(faker.commerce.price(50, 300)),
        })
    }
    return servicesSaloon;
}
const servicesSaloon = generateservicesSaloon(
    ['Pedicure', 'Manicure', 'Cabelereiro', 'Sobrancelha'])


const generateEmployers = (number: number) => {
    const employers: EmployeesType[] = [];
    for (let i = 0; i < number; i++) {
        let employeesServices: ServicesSaloonType[] = []
        for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
            employeesServices.push(servicesSaloon[Math.floor(Math.random() * servicesSaloon.length)])
        }
        employers.push({
            id: faker.unique(faker.database.mongodbObjectId),
            cpf: faker.phone.phoneNumber('###.###.###-40'),
            name: faker.name.findName(),
            birthday: faker.date.past(20),
            services: employeesServices,
        })
    }
    return employers;
}
const employees = generateEmployers(4)

const generateAgreements = (number: number) => {
  const agreements: AgreementsType[] = [];
  for (let i = 0; i < number; i++) {
      let agreementsServices: ServicesSaloonType[] = []
      for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
        agreementsServices.push(servicesSaloon[Math.floor(Math.random() * servicesSaloon.length)])
      }
      agreements.push({
          id: faker.unique(faker.database.mongodbObjectId),
          cnpj: faker.phone.phoneNumber('##.###.###-0001/##'),
          fantasyName: faker.name.jobTitle(),
          corporateName: faker.name.jobArea(),
          cep: faker.address.zipCode('#####-###'),
          street: faker.address.streetName(),
          number: faker.address.buildingNumber(),
          district: faker.address.citySuffix(),
          city: faker.address.city(),
          complement: '',
          discount: parseInt(faker.phone.phoneNumber('##')),
          state: faker.address.state(),
          services: agreementsServices
      })
  }
  return agreements
}
const agreements = generateAgreements(10)

const generateClients = (number: number) => {
  const clients: ClientsType[] = [];
  for (let i = 0; i < number; i++) {
      clients.push({
          id: faker.unique(faker.database.mongodbObjectId),
          cpf: faker.phone.phoneNumber('###.###.###-##'),
          name: faker.name.findName(),
          birthday: faker.date.past(20),
          cep: faker.address.zipCode('#####-###'),
          street: faker.address.streetName(),
          number: faker.address.buildingNumber(),
          district: faker.address.citySuffix(),
          city: faker.address.city(),
          complement: '',
          agreement: agreements[Math.floor(Math.random() * agreements.length + 4)]
      })
  }
  return clients
}
const clients = generateClients(10)

const generateSchedules = (number: number) => {
    const schedules: SchedulesType[] = [];
    const  start = faker.date.recent(0)
    for (let i = 0; i < number; i++) {
        let employee: EmployeesType = employees[Math.floor(Math.random() * employees.length)]
        let service: ServicesSaloonType = employee.services[Math.floor(Math.random() * employee.services.length)]
        
        schedules.push({
            id: faker.unique(faker.database.mongodbObjectId),
            client: clients[Math.floor(Math.random() * clients.length)],
            employee: employee,
            service: service,
            start: start.toISOString(),
            end: new Date(start.getTime() + service.duration*60*1000).toISOString()

        })
    }
    return schedules;
}
const schedules = generateSchedules(10)

const generateCashiers = () :CashiersType[] => {
  let cashiers: CashiersType[] = [];
  let price: number
  let agreement: AgreementsType | undefined
  let status: "AGENDADO" | "ABERTO" | "PAGO" = "AGENDADO"
  let dateString: string | undefined

  schedules.forEach((schedule) => {
    let dateArray = [new Date(schedule.end!),undefined] //prerarar array pago no dia end ou undefined
    if(schedule.end && new Date(schedule.end).getTime() < Date.now()) {
      let date = dateArray[Math.floor(Math.random() * dateArray.length)]
     if (date != undefined) 
        dateString =  date.toISOString() 
      if(dateString){
        status = "PAGO"
      }else {
        status = "ABERTO"
      }
    }
    if(schedule.client.agreement){
      agreement = agreements.find(agreement => agreement.id === schedule.client.agreement?.id)
      if(agreement){
        price = schedule.service.price * agreement.discount / 100
      }else {
        price = schedule.service.price
      } 
    } 
    
    cashiers.push({
      id: faker.unique(faker.database.mongodbObjectId),
      schedule: schedule,
      price: price,
      date: dateString ?? undefined,
      status: status    
    })
  })
  
  return cashiers
}

const cashiers = generateCashiers()


fs.writeFileSync(
    "./db.json",
    JSON.stringify({
        clients: clients,
        servicesSaloons: servicesSaloon,
        employees: employees,
        agreements: agreements,
        schedules: schedules,
        cashiers: cashiers
    })
);
