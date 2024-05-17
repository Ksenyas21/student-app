import dayjs from "dayjs";

export interface StudentAttrs {
  id: string;
  name: string;
  birthday: dayjs.ConfigType;
  idnp: string;
  isActive: boolean;
}

export interface FetchDataResponse {
  students: StudentAttrs[];
  page: number;
  totalPages: number;
  totalRecords: number;
}
