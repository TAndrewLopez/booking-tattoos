import AuthButtons from "../Auth/AuthButtons";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>Raquel Tattoos</div>
      <AuthButtons />
    </div>
  );
};

export default Navbar;
