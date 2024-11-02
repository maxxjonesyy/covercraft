interface Props {
  text: string;
  textSize?: string;
  isBlue?: boolean;
  onClick?: () => void;
  image?: {
    url: string;
    alt: string;
  };
}

function Button({ text, textSize, image, isBlue = false, onClick }: Props) {
  const buttonClass = isBlue
    ? "bg-accentBlue text-white"
    : "border border-secondary";

  return (
    <button
      onClick={onClick}
      className={`${buttonClass} ${textSize} flex items-center justify-center gap-2 text-sm px-4 py-1 rounded`}>
      {image && <img src={image.url} alt={image.alt} />}
      {text}
    </button>
  );
}

export default Button;
