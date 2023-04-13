const ContactInputs = () => {
  return (
    <>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="name"
          placeholder="Enter name"
          type="text"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="pronouns">
          Preferred Pronouns
        </label>
        <input
          id="pronouns"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="pronouns"
          placeholder="Preferred Pronouns"
          type="text"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="email"
          placeholder="Enter email"
          type="email"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="number">
          Phone Number
        </label>
        <input
          id="number"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="number"
          placeholder="Enter phone number"
          type="text"
          required
        />
      </div>
    </>
  );
};

export default ContactInputs;
