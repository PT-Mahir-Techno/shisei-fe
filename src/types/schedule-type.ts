import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const scheduleFormScheme = z.object({
  name: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  date: z.date(),
  time: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  duratation: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  location_id: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  description: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(1000, {message: "Maximum 255 characters"}),
  staff_id: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  max_order: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  color: z.string()
    .min(1, {message: "Minimum 1 character"})
    .max(255, {message: "Maximum 255 characters"}),
  photo: z
  .any()
  .optional()
  .refine((files) => files?.length === 0 || files?.[0]?.size < 5000000, {
    message: 'File size must be less than 5MB',
  })
  .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
})

export type ScheduleType = {
  id:          string;
  location_id: string;
  staff_id:    string;
  name:        string;
  description: string;
  time:        string;
  duration:    string;
  date:        string;
  image:       string;
  max_order:   string;
  color:       string;
  created_at:  string;
  updated_at:  string;
  image_url:   string;
  location:    Location;
  staff:       Staff;
}

export type Location = {
  id:         string;
  name:       string;
  created_at: string;
  updated_at: string;
}

export type Staff = {
  id:                string;
  name:              string;
  email:             string;
  password:          string;
  phone:             string;
  code_phone:        string;
  email_verified_at: null|any;
  role_id:           null|any;
  photo:             null|any;
  alamat:            null|any;
  remember_token:    null|any;
  created_at:        string;
  updated_at:        string;
  photo_url:         null|any;
}


export type SchedulePageType = {
  id:          string;
  location_id: string;
  staff_id:    string;
  name:        string;
  description: string;
  time:        string;
  duration:    string;
  date:        string;
  image:       string;
  max_order:   number;
  color:       string;
  created_at:  Date;
  updated_at:  Date;
  image_url:   string;
  calendar:    any[];
  staff:       StaffType;
  location:    LocationType;
}

export type LocationType = {
  id:         string;
  name:       string;
  created_at: Date;
  updated_at: Date;
}

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
  created_at:        Date;
  updated_at:        Date;
  photo_url:         null;
}
