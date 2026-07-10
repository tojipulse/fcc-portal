export type SectionId = "household" | "guardians" | "players";

export type AdultRole = "guardian" | "guardian_coach" | "coach";

export type EmergencyContactFormData = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
};

export type HouseholdEditFormData = {
  postalCode: string;
  address: string;
  emergencyContacts: EmergencyContactFormData[];
};

export type GuardianEditFormData = {
  id: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  relationship: string;
  phone: string;
  email: string;
  loginId: string;
  password: string;
  role: AdultRole;
};

export type PlayerEditFormData = {
  id: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  nickname: string;
  gradeId: string;
  birthday: string;
  school: string;
  medicalNotes: string;
  memo: string;
  status: "active" | "retired";
  retirementDate: string;
};