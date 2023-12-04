type Props = {
  title: string;
  author: string;
  thumbnail: string;
};
export const AudioDetails = ({ title, author, thumbnail }: Props) => {
  return (
    <div className="bg-gray-800 max-h-full rounded-t-xl px-5 py-8">
      <div className="flex space-x-4">
        <img
          src={thumbnail}
          alt=""
          style={{ height: "100%" }}
          className="flex-none max-h-full rounded-lg bg-gray-100"
        />

        <div className="flex-1 w-2/3 space-y-3 grid justify-start">
          <p className="text-gray-200 text-4xl leading-loose font-semibold truncate w-auto">
            {title}
          </p>

          <p className="text-cyan-500  text-2xl leading-loose capitalize">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
};
