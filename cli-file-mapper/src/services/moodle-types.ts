const data = [
  {
    username: "021223007",
    firstname: "БОРИС",
    middlename: " АЛЬОШОВ",
    lastname: "МАРИНОВ",
    email: "bormarinov@tu-sofia.bg",
    password: "St_021223007",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223016",
    firstname: "ИВАН",
    middlename: " НИКОЛАЕВ",
    lastname: "ПОПОВ",
    email: "ivpopov@tu-sofia.bg",
    password: "St_021223016",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223017",
    firstname: "РОМАН",
    middlename: "",
    lastname: "ЧИСТИКОВ",
    email: "rchistikov@tu-sofia.bg",
    password: "St_021223017",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223022",
    firstname: "ИВАН",
    middlename: " ПЛАМЕНОВ",
    lastname: "МИНЧЕВ",
    email: "ivaminchev@tu-sofia.bg",
    password: "St_021223022",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223014",
    firstname: "БОЯН",
    middlename: " ВЛАДИСЛАВОВ",
    lastname: "ЯРКОВ",
    email: "byarkov@tu-sofia.bg",
    password: "St_021223014",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223008",
    firstname: "БЛАГОВЕСТ",
    middlename: " ИВАНОВ",
    lastname: "ШУМАНОВ",
    email: "bshumanov@tu-sofia.bg",
    password: "St_021223008",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "021223009",
    firstname: "ГЕОРГИ",
    middlename: " БОЖКОВ",
    lastname: "НИКОЛОВ",
    email: "genikolov@tu-sofia.bg",
    password: "St_021223009",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "023221031",
    firstname: "ДАНИЛ",
    middlename: "",
    lastname: "ТКАЧУК",
    email: "dtkachuk@tu-sofia.bg",
    password: "St_023221031",
    cohort1: "ЕФ / ЕТ / 2023",
  },
  {
    username: "273221021",
    firstname: "РУКЕН",
    middlename: "",
    lastname: "ПАЙЧУ",
    email: "rpaychu@tu-sofia.bg",
    password: "St_273221021",
    cohort1: "ФКСТ / КНИ - АЕ / 2023",
  },
  {
    username: "РЧ204802",
    firstname: "ГЕОРГИ",
    middlename: " ТАШО",
    lastname: "СТИНИКЛИЕВ",
    email: "gstinikliev@tu-sofia.bg",
    password: "St_РЧ204802",
    cohort1: "ФКСТ / КСТ / 2023",
  },
  {
    username: "РЧ205158",
    firstname: "ДИМИТРИОС",
    middlename: " НАУМ",
    lastname: "ТАЛЛИС",
    email: "РЧ205158@example.com",
    password: "St_РЧ205158",
    cohort1: "ФКСТ / КСТ / 2023",
  },
  {
    username: "363222018",
    firstname: "АНЕ",
    middlename: " ТЕСАКУИДА",
    lastname: "АНГЕЛЕ-ЖИЛАРД",
    email: "azhilard@tu-sofia.bg",
    password: "St_363222018",
    cohort1: "ФТ / АИ - АЕ / 2023",
  },
  {
    username: "363222005",
    firstname: "ПОЛ",
    middlename: " АНТОАН",
    lastname: "БЕРНАРД-МЕНИКУЧИ",
    email: "pmenikuchi@tu-sofia.bg",
    password: "St_363222005",
    cohort1: "ФТ / АИ - АЕ / 2023",
  },
];

export type MoodleImportUserTypeArr = typeof data;

export type MoodleImportUserType = MoodleImportUserTypeArr[0];

export interface MoodleRemoteUserModelDto {
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
