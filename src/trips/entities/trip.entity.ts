export enum Status {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
}

export class Trip {
  passenger_CPF: string;

  origin_address: string;

  destination_address: string;

  trip_status?: Status;

  distance?: string;
}
