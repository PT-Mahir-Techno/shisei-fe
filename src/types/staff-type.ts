import { RoleType } from "./role-type";

export type StaffType = {
  id:                string;
  name:              string;
  email:             string;
  password:          string;
  phone:             string;
  code_phone:        string;
  email_verified_at: null;
  role_id:           null;
  photo:             null;
  alamat:            null;
  remember_token:    null;
  created_at:        string;
  updated_at:        string;
  photo_url:         null;
  avaibility:        Avaibility;
  role:              RoleType;
}

export type Avaibility = {
  id:         string;
  staff_id:   string;
  sunday:     string;
  monday:     string;
  tuesday:    string;
  wednesday:  string;
  thursday:   string;
  friday:     string;
  saturday:   string;
  created_at: string;
  updated_at: string;
}
