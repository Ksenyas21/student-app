import dayjs from "dayjs";

export interface StudentAttrs {
  id: string;
  name: string;
  birthday: dayjs.ConfigType;
  idnp: string;
  isActive: boolean;
}
