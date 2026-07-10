import type {
  ParsedScheduleItem,
  ScheduleImportResult,
} from "../types";

function normalizeText(value: string) {
  return value.replace(/　/g, " ").trim();
}

function isDateLine(line: string) {
  return /^■\s*\d{1,2}\/\d{1,2}/.test(line);
}

function getDateLabel(line: string) {
  return line.replace(/^■\s*/, "").trim();
}

function isTimeOnlyLine(line: string) {
  return /^(AM|PM|\d{1,2}(:\d{2})?\s*[-〜~]\s*\d{1,2}(:\d{2})?)$/i.test(
    normalizeText(line)
  );
}

function formatTime(value: string) {
  if (!value) return "";

  if (value.includes(":")) return value;

  return `${value}:00`;
}

function parseTime(value: string) {
  const text = normalizeText(value);
  const range = text.match(
    /(\d{1,2}(?::\d{2})?)\s*[-〜~]\s*(\d{1,2}(?::\d{2})?)/
  );

  if (range) {
    return {
      timeText: `${formatTime(range[1])}〜${formatTime(range[2])}`,
      startTime: formatTime(range[1]),
      endTime: formatTime(range[2]),
    };
  }

  if (/^(AM|PM)$/i.test(text)) {
    return {
      timeText: text.toUpperCase(),
      startTime: "",
      endTime: "",
    };
  }

  return {
    timeText: "",
    startTime: "",
    endTime: "",
  };
}

function extractTimeText(line: string) {
  const range = line.match(
    /(\d{1,2}(?::\d{2})?)\s*[-〜~]\s*(\d{1,2}(?::\d{2})?)/
  );

  if (range) return range[0];

  const ampm = line.match(/\b(AM|PM)\b/i);

  return ampm?.[0] ?? "";
}

function parseGrades(value: string) {
  if (value.includes("キッズ")) {
    return {
      gradeIds: ["kids"],
      gradeLabel: "キッズ",
    };
  }

  const gradeIds = value
    .replace(/年生?/g, "")
    .split(/[.．]/)
    .map((grade) => grade.trim())
    .filter(Boolean);

  return {
    gradeIds,
    gradeLabel: gradeIds.map((grade) => `${grade}年`).join("・"),
  };
}

function parseScheduleLine(
  line: string,
  dateLabel: string,
  index: number
): ParsedScheduleItem {
  const normalizedLine = normalizeText(line);
  const gradeMatch = normalizedLine.match(
    /^((?:キッズ|\d+(?:[.．]\d+)*)(?:年生?)?)\s*(.+)$/
  );

  if (!gradeMatch) {
    return {
      id: `schedule-${index}`,
      rawText: normalizedLine,
      dateLabel,
      gradeIds: [],
      gradeLabel: "",
      place: "",
      timeText: "",
      startTime: "",
      endTime: "",
      error: "学年が認識できません",
    };
  }

  const grades = parseGrades(gradeMatch[1]);
  const body = normalizeText(gradeMatch[2]);
  const timeSource = extractTimeText(body);
  const time = parseTime(timeSource);
  const place = normalizeText(body.replace(timeSource, ""));

  if (!place) {
    return {
      id: `schedule-${index}`,
      rawText: normalizedLine,
      dateLabel,
      ...grades,
      place: "",
      ...time,
      error: "場所が認識できません",
    };
  }

  if (!time.timeText) {
    return {
      id: `schedule-${index}`,
      rawText: normalizedLine,
      dateLabel,
      ...grades,
      place,
      ...time,
      error: "時間が認識できません",
    };
  }

  return {
    id: `schedule-${index}`,
    rawText: normalizedLine,
    dateLabel,
    ...grades,
    place,
    ...time,
  };
}

export function parseScheduleText(text: string): ScheduleImportResult {
  const lines = text
    .split("\n")
    .map(normalizeText)
    .filter(Boolean);

  const items: ParsedScheduleItem[] = [];
  let currentDateLabel = "";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.startsWith("《")) continue;

    if (isDateLine(line)) {
      currentDateLabel = getDateLabel(line);
      continue;
    }

    if (!currentDateLabel) continue;

    let scheduleLine = line;
    const nextLine = lines[index + 1];

    if (!extractTimeText(scheduleLine) && nextLine && isTimeOnlyLine(nextLine)) {
      scheduleLine = `${scheduleLine} ${nextLine}`;
      index += 1;
    }

    items.push(parseScheduleLine(scheduleLine, currentDateLabel, items.length));
  }

  const errors = items.filter((item) => item.error);
  const successItems = items.filter((item) => !item.error);

  return {
    items,
    errors,
    successItems,
  };
}