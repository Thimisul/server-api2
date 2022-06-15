import faker from "@faker-js/faker/locale/pt_BR";
import { Random } from "@faker-js/faker/random";
import {
  ClientsType,
  EmployeesType,
  SchedulesType,
  ServicesSaloonType,
} from "./models/index";
const fs = require("fs");

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
const generateClients = (number: number) => {
  const clients: ClientsType[] = [];
  for (let i = 0; i < number; i++) {
    clients.push({
      id: faker.unique(faker.database.mongodbObjectId),
      cpf: faker.phone.phoneNumber("###.###.###-##"),
      name: faker.name.findName(),
      birthday: faker.date.past(20),
      cep: faker.address.zipCode("#####-###"),
      street: faker.address.streetName(),
      number: faker.address.buildingNumber(),
      district: faker.address.citySuffix(),
      city: faker.address.city(),
      complement: "",
    });
  }
  return clients;
};
const clients = generateClients(10);

const generateservicesSaloon = (servicesName: Array<string>) => {
  const servicesSaloon: ServicesSaloonType[] = [];
  const servicesDuration = [15, 30, 45, 60, 90, 105, 120];
  for (let i = 0; i < servicesName.length; i++) {
    servicesSaloon.push({
      id: faker.unique(faker.database.mongodbObjectId),
      name: servicesName[i],
      duration: servicesDuration[Math.floor(Math.random() * servicesDuration.length)].toString(),
      price: faker.commerce.price(50, 300),
    });
  }
  return servicesSaloon;
};
const servicesSaloon = generateservicesSaloon([
  "Pedicure",
  "Manicure",
  "Cabelereiro",
  "Sobrancelha",
]);

const generateEmployers = (number: number) => {
  const Employers: EmployeesType[] = [];
  for (let i = 0; i < number; i++) {
    let employeesServices: ServicesSaloonType[] = [];
    for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
      employeesServices.push(servicesSaloon[Math.floor(Math.random() * servicesSaloon.length)]);
    }
    Employers.push({
      id: faker.unique(faker.database.mongodbObjectId),
      cpf: faker.phone.phoneNumber("###.###.###-40"),
      name: faker.name.findName(),
      birthday: faker.date.past(20),
      services: employeesServices,
    });
  }
  return Employers;
};
const employees = generateEmployers(4);

const generateSchedules = (number: number) => {
  const schedules: SchedulesType[] = [];
  for (let i = 0; i < number; i++) {
    let employee: EmployeesType = employees[Math.floor(Math.random() * employees.length)];
    schedules.push({
      id: faker.unique(faker.database.mongodbObjectId),
      client: clients[Math.floor(Math.random() * clients.length)],
      employee: employee,
      service: employee.services[Math.floor(Math.random() * employee.services.length)],
      start: faker.date.recent(),
      end: faker.date.soon(),
    });
  }
  return schedules;
};
const schedules = generateSchedules(4);

fs.writeFileSync(
  "./db.json",
  JSON.stringify({
    clients: clients,
    servicesSaloons: servicesSaloon,
    employees: employees,
    schedules: schedules,
  })
);
