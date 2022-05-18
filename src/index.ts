import  faker  from '@faker-js/faker/locale/pt_BR';
import { ClientsType, EmployeesType } from './models/index';
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
     for(let  i = 0; i< number; i++){
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
             complement: ''
         })
     }
   return clients
 }

 const generateEmployers = (number: number) => {
    const Employers: EmployeesType[] = [];
    for(let  i = 0; i< number; i++){
        Employers.push({
          id: faker.unique(faker.database.mongodbObjectId),
             cpf: faker.phone.phoneNumber('###.###.###-40'),
             name: faker.name.findName(),
             birthday: faker.date.past(20),
          services: ['Cabelereiro','Manicure']
        })
    }
  return Employers;
}

fs.writeFileSync(
    "./db.json",
    JSON.stringify({ clients: generateClients(6), employees: generateEmployers(7) })
  );