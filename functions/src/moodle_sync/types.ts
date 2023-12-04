export interface MoodleUserDto {
  cohorts: string[];
  course: number;
  degree: string;
  email: string;
  faculty: string;
  firstname: string;
  middlename: string;
  lastname: string;
  password: string;
  specialty: string;
  username: string;
  facNumber: string;
}

export interface UsersSyncReq {
  users: MoodleUserDto[];
}
