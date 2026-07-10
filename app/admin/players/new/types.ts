export type HouseholdFormData = {
  loginId: string;
  password: string;
};

export type GuardianFormData = {
  id: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  relationship: "父" | "母" | "祖父" | "祖母" | "その他";
  phone: string;
  email: string;
};

export type EmergencyContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
};

export type PlayerFormData = {
  id: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  nickname: string;
  gradeId: string;

  birthday: string;
  school: string;

  postalCode: string;
  address: string;

  medicalNotes: string;
  memo: string;

  emergencyContacts: EmergencyContact[];

  active: boolean;
  retirementDate: string;
};