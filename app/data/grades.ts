export type Grade = {
  id: string;
  name: string;
  order: number;
};

export const grades: Grade[] = [
  {
    id: "all",
    name: "全学年",
    order: 0,
  },
  {
    id: "kids",
    name: "キッズ",
    order: 1,
  },
  {
    id: "1",
    name: "1年",
    order: 2,
  },
  {
    id: "2",
    name: "2年",
    order: 3,
  },
  {
    id: "3",
    name: "3年",
    order: 4,
  },
  {
    id: "4",
    name: "4年",
    order: 5,
  },
  {
    id: "5",
    name: "5年",
    order: 6,
  },
  {
    id: "6",
    name: "6年",
    order: 7,
  },
];