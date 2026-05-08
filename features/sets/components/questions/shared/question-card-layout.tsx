import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const QuestionCardLayout: React.FC<Props> = ({
  title,
  children,
  className,
}) => {
  return (
    <Card className={className}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};
