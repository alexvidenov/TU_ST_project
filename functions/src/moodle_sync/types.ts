export interface MoodleUserModel {
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
  users: MoodleUserModel[];
}

export interface UpdatePassReq {
  facNumber: string;
  newPass: string;
}
