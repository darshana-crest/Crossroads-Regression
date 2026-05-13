import { faker } from '@faker-js/faker';

export const generateContactData = () => {

    return {

        firstName: faker.person.firstName(),

        lastName: faker.person.lastName(),

        email: `test${Date.now()}@gmail.com`,

        phone: `+1242 ${faker.string.numeric(3)} ${faker.string.numeric(4)}`
    };
};