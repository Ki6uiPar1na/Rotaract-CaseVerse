import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-6">
        {icon || <Inbox className="w-8 h-8 text-muted" />}
      </div>
      <h3 className="font-heading text-xl font-semibold text-text">{title}</h3>
      {description && (
        <p className="mt-2 text-muted max-w-md leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
