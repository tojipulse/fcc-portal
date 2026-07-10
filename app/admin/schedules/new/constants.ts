import {
  Grade,
  MasterItem,
  Player,
  PlayerTemplate,
  ScheduleFormData,
  ScheduleType,
} from "./types";

export const GRADE_OPTIONS: {
  value: Grade;
  label: string;
}[] = [
  { value: "kids", label: "キッズ" },
  { value: "u8", label: "1年" },
  { value: "u9", label: "2年" },
  { value: "u10", label: "3年" },
  { value: "u11", label: "4年" },
  { value: "u12", label: "5・6年" },
];

export const SCHEDULE_TYPE_OPTIONS: {
  value: ScheduleType;
  label: string;
}[] = [
  {
    value: "practice",
    label: "通常練習",
  },
  {
    value: "trm",
    label: "TRM",
  },
  {
    value: "tournament",
    label: "大会",
  },
  {
    value: "league",
    label: "リーグ戦",
  },
  {
    value: "event",
    label: "イベント",
  },
  {
    value: "other",
    label: "その他",
  },
];

export const TOURNAMENT_OPTIONS: MasterItem[] = [
  {
    id: "arakawa",
    name: "荒川区交流戦",
    displayOrder: 1,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "adachi",
    name: "足立区交流戦",
    displayOrder: 2,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "thomas",
    name: "トーマス",
    displayOrder: 3,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "hatomark",
    name: "ハトマーク",
    displayOrder: 4,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "lions",
    name: "ライオンズ",
    displayOrder: 5,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "copa",
    name: "コパ荒川",
    displayOrder: 6,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "kawabuchi",
    name: "川淵杯",
    displayOrder: 7,
    isActive: true,
    isDeleted: false,
  },
];

export const LEAGUE_OPTIONS: MasterItem[] = [
  {
    id: "good",
    name: "Goodリーグ",
    displayOrder: 1,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "u10",
    name: "U10リーグ",
    displayOrder: 2,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "u11",
    name: "U11リーグ",
    displayOrder: 3,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "u12",
    name: "U12リーグ",
    displayOrder: 4,
    isActive: true,
    isDeleted: false,
  },
];

export const EVENT_OPTIONS: MasterItem[] = [
  {
    id: "parent",
    name: "親子サッカー",
    displayOrder: 1,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "graduation",
    name: "卒団式",
    displayOrder: 2,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "year-end",
    name: "蹴り納め",
    displayOrder: 3,
    isActive: true,
    isDeleted: false,
  },
];

export const PLACE_OPTIONS: MasterItem[] = [
  {
    id: "zuiko",
    name: "瑞光小学校",
    displayOrder: 1,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "higashiogu",
    name: "東尾久グランド",
    displayOrder: 2,
    isActive: true,
    isDeleted: false,
  },
  {
    id: "minamisenju",
    name: "南千住広場",
    displayOrder: 3,
    isActive: true,
    isDeleted: false,
  },
];

export const SAMPLE_PLAYERS: Player[] = [];

export const SAMPLE_PLAYER_TEMPLATES: PlayerTemplate[] = [];

export const INITIAL_FORM: ScheduleFormData = {
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  scheduleType: "practice",
  subType: "",
  placeId: "",
  grades: [],
  displayNextGrade: false,
  items: "",
  memo: "",
  playerScope: "all",
  selectedPlayerIds: [],
  templateId: "",
};