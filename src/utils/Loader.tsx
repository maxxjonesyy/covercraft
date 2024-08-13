import ClipLoader from "react-spinners/ClipLoader";

function Loader({ size = 20 }: { size?: number }) {
  return (
    <span className="flex items-center">
      <ClipLoader color="#FFFFFF" size={size} speedMultiplier={0.75} />
    </span>
  );
}

export default Loader;
