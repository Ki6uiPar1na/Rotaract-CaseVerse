import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    path: string;
  };
  secondaryAction?: {
    label: string;
    path: string;
  };
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryAction && (
            <Link
              to={primaryAction.path}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold bg-primary text-bg rounded-lg hover:bg-primary-hover transition-colors"
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {secondaryAction && (
            <Link
              to={secondaryAction.path}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold border border-border text-text rounded-lg hover:bg-surface-light transition-colors"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
