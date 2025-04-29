
import { getStatusColor, getStatusText, RequestStatus } from "@/utils/dummyData";

type StatusBadgeProps = {
  status: RequestStatus;
  className?: string;
};

const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium text-white inline-flex items-center";
  const statusColor = getStatusColor(status);
  const statusLabel = getStatusText(status);

  return (
    <span className={`${baseClasses} ${statusColor} ${className}`}>
      {statusLabel}
    </span>
  );
};

export default StatusBadge;
