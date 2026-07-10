type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`
        rounded-2xl
        bg-white
        p-4
        shadow-sm
        ${className}
      `}
    >
      {children}
    </section>
  );
}