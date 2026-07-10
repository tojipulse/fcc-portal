import Button from "../ui/Button";

type AttendanceButtonsProps = {
  status?: "attend" | "absent" | "pending";
};

export default function AttendanceButtons({
  status = "pending",
}: AttendanceButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        fullWidth
        variant={status === "attend" ? "primary" : "secondary"}
      >
        ✅ 出席
      </Button>

      <Button
        fullWidth
        variant={status === "absent" ? "danger" : "secondary"}
      >
        ❌ 欠席
      </Button>
    </div>
  );
}