import { TicketsSection } from "@/components/TicketsSection";
import { ActionLogSection } from "@/components/ActionLogSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <TicketsSection />
      <ActionLogSection />
    </div>
  );
};

export default Index;