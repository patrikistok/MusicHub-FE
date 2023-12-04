import { FC } from "react";

type Props = {
  lyrics: string;
};

export const Lyrics: FC<Props> = ({ lyrics }) => {
  return (
    <div
      style={{ whiteSpace: "pre-line" }}
      className="bg-black text-white text-3xl py-4 px-16 leading-loose max-h-full"
    >
      {lyrics}
    </div>
  );
};
