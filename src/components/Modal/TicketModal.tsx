import { GiSpottedBug } from "react-icons/gi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Input from "../Form/Inputs/Input";
import TextArea from "../Form/Inputs/TextArea";
import useTicket from "@/hooks/useTicket";

const TicketModal = () => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const {
    ticketState: { category, priority, description, steps },
    setTicketState,
    isLoading,
    inputError,
    handleCreateTicket,
    resetStates,
  } = useTicket();

  if (!sessionData?.user) return null;

  return (
    <>
      {!isOpen && (
        <div
          className="fixed bottom-0 right-0 z-40 cursor-pointer rounded-t bg-neutral-100/70 p-1 text-blue-400 hover:bg-white/100 md:right-3"
          onClick={() => setIsOpen(true)}
        >
          <GiSpottedBug size={26} />
        </div>
      )}
      <div
        className={`fixed bottom-0 right-0 z-50 h-full w-full rounded-t bg-neutral-100 duration-300 ease-in-out md:h-[550px] md:w-[448px]
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="px-4 pb-4 pt-4 md:pb-0">
          <h2 className="mb-2 flex items-center text-xl">
            Report a Bug
            <GiSpottedBug className="ml-2 inline-block" size={26} />
          </h2>
          <p className="text-xs text-neutral-600">
            This form is designated to inform the development team of any bugs.
            Please submit your information to help improve the website/user
            experience.
          </p>
        </div>
        <div className="w-full p-4">
          <form className="flex flex-col gap-3">
            <select
              className="rounded bg-neutral-200 p-4 text-neutral-700"
              disabled={isLoading}
              value={category}
              onChange={({ target }) => {
                const categoryValue = target.value ? target.value : "";
                setTicketState((prev) => ({
                  ...prev,
                  category: categoryValue,
                }));
              }}
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="Submission">Submission</option>
              <option value="Calendar">Calendar</option>
            </select>

            <select
              className={`rounded bg-neutral-200 p-4 
              ${priority === "low" ? "text-green-600" : ""}
              ${priority === "medium" ? "text-yellow-600" : ""}
              ${priority === "high" ? "text-red-600" : ""}
              `}
              disabled={isLoading}
              value={priority}
              onChange={({ target }) => {
                const categoryValue = target.value ? target.value : "";
                setTicketState((prev) => ({
                  ...prev,
                  priority: categoryValue,
                }));
              }}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <Input
              id="description"
              label="Description of bug"
              type="text"
              error={inputError === "description"}
              disabled={isLoading}
              value={description}
              onChange={({ target }) =>
                setTicketState((prev) => ({
                  ...prev,
                  description: target.value,
                }))
              }
            />
            <TextArea
              id="steps"
              label="Steps to recreate"
              error={inputError === "steps"}
              disabled={isLoading}
              value={steps}
              onChange={({ target }) =>
                setTicketState((prev) => ({
                  ...prev,
                  steps: target.value,
                }))
              }
            />
            <div className="fixed bottom-4 left-4 right-4 flex justify-between">
              <button
                type="button"
                disabled={isLoading}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsOpen(false);
                  resetStates();
                }}
                className="flex items-center justify-center rounded-md bg-red-200 px-3 py-2 text-red-900 hover:bg-red-900 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={(evt) => {
                  handleCreateTicket(evt, setIsOpen);
                }}
                className="flex items-center justify-center rounded-md bg-emerald-200 px-3 py-2 text-emerald-900 hover:bg-emerald-900 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TicketModal;
