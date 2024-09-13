interface Props {
  text: string;
  isBlue?: boolean;
  onClick?: () => void;
  image?: {
    url: string;
    alt: string;
  };
}

function Button({ text, image, isBlue = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isBlue ? "bg-accentBlue text-white" : "border border-secondary"
      } flex items-center justify-center gap-2 text-sm 
      } px-4 py-1 rounded`}>
      {image && <img src={image.url} alt={image.alt} />}
      {text}
    </button>
  );
}

export default Button;
