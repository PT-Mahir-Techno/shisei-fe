export type PaymentType = {
  id:             string;
  user_id:        string;
  membership_id:  string;
  status:         string;
  price:          number;
  trx:            string;
  payment_method: string;
  created_at:     string;
  updated_at:     string;
  user:           User;
}

export type User = {
  id:                string;
  name:              string;
  email:             string;
  email_verified_at: string;
  phone:             string;
  code_phone:        string;
  gender:            string;
  birth:             null;
  photo:             string;
  country:           string;
  address:           string;
  created_at:        string;
  updated_at:        string;
  photo_url:         string;
}
