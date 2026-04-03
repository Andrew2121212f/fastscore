import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

/**
 * Компонент пустого состояния — иконка + текст + опциональная кнопка.
 */
export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="card p-10 flex flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface mb-4">
        <Icon className="h-6 w-6 text-text-muted" />
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-text-muted max-w-xs">{description}</p>
      )}
      {action && (
        <a
          href={action.href}
          className="mt-4 px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl hover:brightness-110 transition-all"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
