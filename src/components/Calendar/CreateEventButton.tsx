import { BsPlus } from "react-icons/bs";

const CreateEventButton = () => {
  return (
    <button className="flex items-center rounded-full border p-2 shadow-md hover:shadow-2xl">
      <BsPlus className="text-blue-500" size={28} />
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
