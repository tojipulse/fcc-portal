"use client";

import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import FormLabel from "../../../../components/ui/form/FormLabel";

import type { CoachStatus } from "../types";

type StatusSectionProps = {
  status: CoachStatus;
  onChange: (status: CoachStatus) => void;
};

export default function StatusSection({
  status,
  onChange,
}: StatusSectionProps) {
  return (
    <Card>
      <FormLabel>在籍状況</FormLabel>

      <div className="mt-2 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={status === "active" ? "primary" : "secondary"}
          fullWidth
          onClick={() => onChange("active")}
        >
          在籍
        </Button>

        <Button
          type="button"
          variant={status === "retired" ? "primary" : "secondary"}
          fullWidth
          onClick={() => onChange("retired")}
        >
          退団
        </Button>
      </div>
    </Card>
  );
}