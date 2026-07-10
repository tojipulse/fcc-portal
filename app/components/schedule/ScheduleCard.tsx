import Button from "../ui/Button";
import GradeBadge from "./GradeBadge";

type ScheduleCardProps = {
  date: string;
  grades: string[];
  title: string;
  icon?: string;
  time: string;
  place: string;
  joint?: boolean;
  answerDeadlineLabel?: string;
  deadlineOver?: boolean;
};

export default function ScheduleCard({
  date,
  grades,
  title,
  icon = "⚽",
  time,
  place,
  joint = false,
  answerDeadlineLabel,
  deadlineOver = false,
}: ScheduleCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-2xl font-black">{date}</div>

        {grades.map((grade) => (
          <GradeBadge
            key={grade}
            label={grade}
            variant={grade === "全学年" ? "all" : "grade"}
          />
        ))}

        {joint && <GradeBadge label="合同" variant="joint" />}
      </div>

      <div className="mt-3 text-lg font-black text-green-700">
        {icon} {title}
      </div>

      <div className="mt-2 text-sm font-bold text-slate-700">🕘 {time}</div>

      <div className="text-sm font-bold text-slate-700">📍 {place}</div>

      {answerDeadlineLabel && (
        <div className="mt-2 text-sm font-black text-red-600">
          ⏰ 回答期限：{answerDeadlineLabel}
        </div>
      )}

      {deadlineOver && (
        <div className="mt-3 rounded-xl bg-orange-50 p-3 text-sm font-black leading-6 text-orange-700">
          <div>⚠️ 回答期限を過ぎています</div>
          <div>回答はまだ可能です</div>
        </div>
      )}

      <Button className="mt-4" fullWidth>
        詳細を見る
      </Button>
    </div>
  );
}