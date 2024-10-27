import ClipLoader from "react-spinners/ClipLoader";

function Loader({
  size = 20,
  colour = "white",
}: {
  size?: number;
  colour?: string;
}) {
  return (
    <span className="flex items-center">
      <ClipLoader size={size} color={colour} speedMultiplier={0.75} />
    </span>
  );
}

export default Loader;
