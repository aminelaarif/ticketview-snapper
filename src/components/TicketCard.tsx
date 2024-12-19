import { Ticket } from "@/types/ticket";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const stateColors = {
  open: "bg-blue-50 text-blue-700 border border-blue-200",
  in_progress: "bg-amber-50 text-amber-700 border border-amber-200",
  closed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
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
      className="group p-6 bg-white rounded-lg border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-3">
        {ticket.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(ticket.dateOpened).toLocaleDateString()}</span>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            stateColors[ticket.state]
          )}
        >
          {stateLabels[ticket.state]}
        </span>
      </div>
    </div>
  );
};