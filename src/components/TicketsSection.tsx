import { useState } from "react";
import { TicketCard } from "./TicketCard";
import { TicketModal } from "./TicketModal";
import { Ticket } from "@/types/ticket";

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Unable to access dashboard",
    description: "Users are reporting issues accessing the main dashboard. The page loads indefinitely without showing any content.\n\nSteps to reproduce:\n1. Log in to the application\n2. Navigate to dashboard\n3. Observe loading state",
    dateOpened: "2024-03-20",
    state: "open",
  },
  {
    id: "2",
    title: "Update user profile picture",
    description: "Need to implement the ability for users to update their profile pictures. Should support JPG and PNG formats.",
    dateOpened: "2024-03-19",
    state: "in_progress",
  },
  {
    id: "3",
    title: "Fix payment processing bug",
    description: "Payment processing was failing for international transactions. Issue has been resolved by updating the payment gateway configuration.",
    dateOpened: "2024-03-15",
    state: "closed",
  },
];

export const TicketsSection = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tickets</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => handleTicketClick(ticket)}
          />
        ))}
      </div>
      <TicketModal
        ticket={selectedTicket}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};