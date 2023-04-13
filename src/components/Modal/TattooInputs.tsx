const TattooInputs = () => {
  return (
    <>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="description"
          placeholder="Enter tattoo description"
          type="text"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="size">
          Tattoo Size
        </label>
        <input
          id="size"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="size"
          placeholder="Size of tattoo"
          type="text"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="placement">
          Placement
        </label>
        <input
          id="placement"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="placement"
          placeholder="Placement of tattoo"
          type="email"
          required
        />
      </div>
      <div className="grid w-full grid-cols-5 items-center gap-5">
        <label className="text-sm" htmlFor="color">
          Color
        </label>
        <input
          id="color"
          className="col-span-4 w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
          name="color"
          placeholder="Color of tattoo"
          type="text"
          required
        />
      </div>
    </>
  );
};

export default TattooInputs;
