import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MessageSquare, X } from "lucide-react";
import { Ticket } from "@/types/ticket";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TicketModalProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export const TicketModal = ({ ticket, open, onOpenChange }: TicketModalProps) => {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ticket) return null;

  const handleSubmitResponse = async () => {
    setIsSubmitting(true);
    // Here you would typically make an API call to submit the response
    console.log("Submitting response:", response);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    setResponse("");
    onOpenChange(false);
  };

  const handleCloseTicket = async () => {
    setIsSubmitting(true);
    // Here you would typically make an API call to close the ticket
    console.log("Closing ticket:", ticket.id);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            {ticket.title}
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                stateColors[ticket.state]
              )}
            >
              {stateLabels[ticket.state]}
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Ticket #{ticket.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Opened on {new Date(ticket.dateOpened).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{new Date(ticket.dateOpened).toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {ticket.state !== "closed" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Response</span>
              </div>
              <Textarea
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCloseTicket}
                  disabled={isSubmitting}
                >
                  Close Ticket
                </Button>
                <Button
                  onClick={handleSubmitResponse}
                  disabled={!response.trim() || isSubmitting}
                >
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};