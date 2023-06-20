type User = {
  username: string;
  senha: string;
  role: 'student' | 'instructor' | 'pilot' | 'employee' | 'admin';
}

type Address = {
  state: string;
  city: string;
  street: string;
  number: number;
  complement?: string;
}

type Partner = {
  registerNumber: string;
  name: string;
  document: string;
  email: string;
  birthDate: Date;
  address: Address;
  flights?: Flight[];
} & User;

enum Score {
  A=4, 
  B=3,
  C=2,
  D=1,
  F=0,
}

type Student = Partner;

type Pilot = {
  licence: string;
} & Partner;

type Instructor = {
  course: string;
  graduationDate: Date;
  institution: string;
} & Pilot;

type Employee = {
  reiwisterNumber: string,
  nome: string;
  document: string;
  birthDate: Date;
  address: Address;
}

type FlightFree = {
  slug: string;
  startAt: Date;
  endAt: Date;
  pilot: Pilot;
}

type FlightLesson = {
  slug: string;
  startAt: Date;
  endAt: Date;
  score?: Score;
  instructor?: Instructor;
  student?: Student;
}

type Flight = FlightFree | FlightLesson;