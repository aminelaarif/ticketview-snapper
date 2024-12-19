import { Ticket } from "@/types/ticket";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const stateColors = {
  open: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
};

const stateLabels = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

export const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(ticket.dateOpened).toLocaleDateString()}</span>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            stateColors[ticket.state]
          )}
        >
          {stateLabels[ticket.state]}
        </span>
      </div>
    </div>
  );
};