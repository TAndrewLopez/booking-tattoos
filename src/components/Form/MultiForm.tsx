import ContactForm from "@/components/Form/ContactForm";
import TattooForm from "@/components/Form/TattooForm";
import Image from "next/image";

const MultiForm = () => {
  return (
    <div className="md:grid md:grid-cols-4">
      <div className="md:cols-span-1 relative h-[100px] md:h-full">
        <Image
          fill
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
          }}
          alt="form-image"
          src="/images/tattooTray.jpg"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <ul className="flex gap-4">
            <li className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm">
              1
            </li>
            <li className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm">
              2
            </li>
          </ul>
        </div>
      </div>
      <div className="md:col-span-3">
        <ContactForm />
        <TattooForm />
      </div>
    </div>
  );
};

export default MultiForm;
