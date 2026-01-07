type FeatureProps = {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
};

function FeatureRow({ title, description, image, reverse }: FeatureProps) {
  return (
    <div
      className={`relative flex flex-wrap md:flex-nowrap justify-between gap-12 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}>
      <div className="relative z-10">
        <h3 className="relative text-2xl font-semibold w-fit px-2 mb-4 text-white">
          <span className="absolute inset-0 bg-gradient-to-r from-[#3943B7]/75 to-purple-600/75 transform skew-x-6 rounded-lg -z-10"></span>
          {title}
        </h3>
        <p className="text-gray-600 text-base leading-tight">{description}</p>
      </div>

      <div className="relative border-2 rounded-lg">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg max-w-full md:max-w-[500px]"
        />
      </div>
    </div>
  );
}

export default FeatureRow;
