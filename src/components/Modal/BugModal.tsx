import useCreateTicket from "@/hooks/useCreateTicket";
import { GiSpottedBug } from "react-icons/gi";
import TextArea from "../Inputs/TextArea";
import FromRightModal from "../AnimatedContainers/FromRightModal";
import Input from "../Inputs/Input";
import useLayout from "@/hooks/global/useLayout";
import { AiOutlineClose } from "react-icons/ai";

const BugModal = () => {
  const { setModalName } = useLayout();

  const {
    ticketState: { category, priority, description, steps },
    setTicketState,
    isLoading,
    inputError,
    handleCreateTicket,
    resetStates,
  } = useCreateTicket();
  return (
    <FromRightModal containerName="bug">
      <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-opacity-60 backdrop-blur-sm backdrop-filter">
        <div className="relative z-30 h-full w-full rounded-t bg-neutral-100 shadow-2xl shadow-sky-200 duration-300 ease-in-out md:h-[550px] md:w-[448px]">
          <div className="px-4 pb-4 pt-4 md:pb-0">
            <div className="flex items-center justify-between">
              <h2 className="mb-2 flex items-center text-xl">
                Report a Bug
                <GiSpottedBug className="ml-2 inline-block" size={26} />
              </h2>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-200"
                onClick={() => setModalName("")}
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
            <p className="p-2.5 text-center text-xs text-neutral-600">
              This form is designated to inform the development team of any
              bugs. Please submit your information to help improve the
              website/user experience.
            </p>
          </div>
          <div className="w-full p-4">
            <form className="flex flex-col gap-3">
              <select
                className={`rounded bg-neutral-200 p-4 text-neutral-700
              ${inputError === "category" ? "border-2 border-red-600" : ""}
              `}
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
              ${inputError === "priority" ? "border-2 border-red-600" : ""}
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
              <div className="flex justify-between">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setModalName("");
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
                    handleCreateTicket(evt, setModalName);
                  }}
                  className="flex items-center justify-center rounded-md bg-emerald-200 px-3 py-2 text-emerald-900 hover:bg-emerald-900 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FromRightModal>
  );
};

export default BugModal;
