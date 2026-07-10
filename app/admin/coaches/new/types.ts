export type AddMode = "existing" | "new";

export type CoachStatus = "active" | "retired";

export type CoachLicenseFormData = {
  id: string;
  category: string;
  name: string;
  registrationNumber: string;
  acquiredDate: string;
  expireDate: string;
};

export type CoachPositionFormData = {
  id: string;
  category: string;
  name: string;
};