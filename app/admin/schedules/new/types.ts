export type Grade =
  | "kids"
  | "u8"
  | "u9"
  | "u10"
  | "u11"
  | "u12";

export type ScheduleType =
  | "practice"
  | "trm"
  | "tournament"
  | "league"
  | "event"
  | "other";

export interface MasterItem {
  id: string;
  name: string;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Player {
  id: string;
  name: string;
  grade: Grade;
  jerseyNumber?: number;
}

export interface PlayerTemplate {
  id: string;
  name: string;
  description: string;
  gradeSet: Grade[];
  players: string[];
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface ScheduleFormData {
  title: string;

  date: string;

  startTime: string;

  endTime: string;

  scheduleType: ScheduleType;

  subType: string;

  placeId: string;

  grades: Grade[];

  displayNextGrade: boolean;

  items: string;

  memo: string;

  playerScope: "all" | "selected";

  selectedPlayerIds: string[];

  templateId: string;
}

export interface BasicInfoProps {
  value: ScheduleFormData;
  onChange: (value: Partial<ScheduleFormData>) => void;
}

export interface GradeSelectorProps {
  value: Grade[];
  displayNextGrade: boolean;
  onGradesChange: (grades: Grade[]) => void;
  onDisplayNextGradeChange: (checked: boolean) => void;
}

export interface TemplateSelectorProps {
  templates: PlayerTemplate[];
  selectedTemplateId: string;
  onTemplateChange: (templateId: string) => void;
}

export interface PlayerSelectorProps {
  players: Player[];
  selectedPlayerIds: string[];
  playerScope: "all" | "selected";
  onPlayerScopeChange: (scope: "all" | "selected") => void;
  onSelectionChange: (playerIds: string[]) => void;
}