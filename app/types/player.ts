export type Player = {
  id: string;
  householdId: string;
  firstName: string;
  gradeId: string;
  displayOrder: number;
  joinedAt: string;
  leftAt?: string;
  isActive: boolean;
};