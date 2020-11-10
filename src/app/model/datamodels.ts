export interface Office {
  id: string;
  ownerId: string;
  name: string;
  location: string;
  email: string;
  tellNumber: string;
  maxOfficeOccupants: number;
  officeColor: string;
}

export interface Employee {
  firstName: string;
  lastName: string;
  employeeId: string;
}

export interface User {
  email: string;
  uid: string;
}
