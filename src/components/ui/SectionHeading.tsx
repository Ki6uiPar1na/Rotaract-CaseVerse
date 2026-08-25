import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 lg:mb-14", align === "center" && "text-center", className)}>
      {label && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted max-w-2xl leading-relaxed text-base lg:text-lg mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
