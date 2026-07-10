type GradeBadgeProps = {
  label: string;
  variant?: "grade" | "all" | "joint";
};

export default function GradeBadge({
  label,
  variant = "grade",
}: GradeBadgeProps) {
  const variantClass = {
    grade: "bg-blue-600 text-white",
    all: "bg-purple-600 text-white",
    joint: "bg-slate-200 text-slate-800",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-md
        px-2
        py-1
        text-xs
        font-bold
        ${variantClass[variant]}
      `}
    >
      {label}
    </span>
  );
}