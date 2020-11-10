export interface Office {
  id: string;
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
