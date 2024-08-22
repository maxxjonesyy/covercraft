import { Link } from "react-router-dom";

interface Props {
  text: string;
  pathname: string;
  image?: {
    url: string;
    alt: string;
  };
}

function ButtonLink({ text, pathname, image }: Props) {
  return (
    <Link to={pathname}>
      <button className="flex items-center gap-1 px-4 py-1 border border-secondary rounded transition-color duration-300 hover:bg-gray-100">
        {text}
        {image && <img src={image.url} alt={image.alt} />}
      </button>
    </Link>
  );
}

export default ButtonLink;
