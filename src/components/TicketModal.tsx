import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ticket } from "@/types/ticket";
import { Calendar, Clock } from "lucide-react";

interface TicketModalProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TicketModal = ({ ticket, open, onOpenChange }: TicketModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{ticket.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Opened on {new Date(ticket.dateOpened).toLocaleDateString()}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Status</span>
            </div>
            <span className="capitalize text-sm font-medium text-gray-900">
              {ticket.state.replace("_", " ")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};