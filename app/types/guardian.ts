export type GuardianRelation =
  | "father"
  | "mother"
  | "grandfather"
  | "grandmother"
  | "other";

export type Guardian = {
  id: string;
  householdId: string;
  name: string;
  relation: GuardianRelation;
  loginId: string;
  displayOrder: number;
};