import {
  CircleX,
  FileQuestionMark,
  ServerCrash,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ErrorCode = 400 | 404 | 500;

type ErrorMessageContent = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const errorContents: Record<ErrorCode, ErrorMessageContent> = {
  400: {
    icon: CircleX,
    title: "400 Une erreur s'est produite",
    description: "Veuillez réessayer.",
  },
  404: {
    icon: FileQuestionMark,
    title: "404 Page non trouvée",
    description: "Veuillez explorer une autre page.",
  },
  500: {
    icon: ServerCrash,
    title: "500 Une erreur s'est produite sur nos serveurs",
    description: "Veuillez réessayer plus tard.",
  },
};

type ErrorMessageProps = {
  code: ErrorCode;
  className?: string;
};

export const ErrorMessage = ({ code, className }: ErrorMessageProps) => {
  const { icon: Icon, title, description } = errorContents[code];

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full flex-1 flex-row items-center justify-center gap-4 p-4",
        className,
      )}
    >
      <Icon className="size-16 shrink-0 text-primary" />
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
