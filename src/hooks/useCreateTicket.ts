import { type TicketInterface } from "@/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { type SyntheticEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

const useCreateTicket = () => {
  const { data: sessionData } = useSession();
  const { refetch: refetchTicketData } = api.ticket.getAllTickets.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const createTicket = api.ticket.createTicket.useMutation({
    onSuccess: () => refetchTicketData(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState("");
  const [ticketState, setTicketState] = useState<TicketInterface>({
    category: "",
    priority: "",
    description: "",
    steps: "",
  });

  const resetStates = () => {
    setIsLoading(false);
    setInputError("");
    setTicketState({
      category: "",
      priority: "",
      description: "",
      steps: "",
    });
  };

  const handleCreateTicket = useCallback(
    (evt: SyntheticEvent, setModalName: (name: string) => void) => {
      evt.preventDefault();
      const { category, priority, description, steps } = ticketState;

      if (inputError) setInputError("");

      if (!category) {
        setInputError("category");
        return toast.error("Category field is required.");
      }
      if (!priority) {
        setInputError("priority");
        return toast.error("Priority field is required.");
      }
      if (!description) {
        setInputError("description");
        return toast.error("Description field is required.");
      }
      if (!steps) {
        setInputError("steps");
        return toast.error("Steps field is required.");
      }

      try {
        setIsLoading(true);
        createTicket.mutate({
          category,
          priority,
          description,
          steps,
          userId: sessionData?.user.id,
        });
        setTicketState({
          category: "",
          description: "",
          steps: "",
          priority: "",
        });
        toast.success("Ticket was created successfully.");
        setModalName("");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [ticketState, createTicket, inputError, sessionData?.user.id]
  );

  return {
    isLoading,
    ticketState,
    setTicketState,
    inputError,
    handleCreateTicket,
    resetStates,
  };
};

export default useCreateTicket;
