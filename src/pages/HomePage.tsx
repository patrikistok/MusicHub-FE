import { useEffect, useState } from "react";
import { AudioPlayer } from "../components/AudioPlayer";
import { useGetSong } from "../hooks/useGetSong";
import * as C from "../styles";
import { MusicList } from "../components/MusicList";

export const HomePage = () => {
  const musics = [
    {
      name: "Kancelář",
      author: "Ektor",
      genre: "Rap",
      audio: "./music/kancelar.mp3",
      album_img: "./imgs/kancelar.jpeg",
      id: "0",
    },
    {
      name: "Both of Us",
      author: "madIRFAN",
      genre: "Beats",
      audio: "./music/both-of-us.mp3",
      album_img: "./imgs/birds.png",
      id: "1",
    },
    {
      name: "Slow Motion",
      author: "Benjamin Tissot",
      genre: "Ambient",
      audio: "./music/slowmotion.mp3",
      album_img: "https://cdn.bensound.com/image/cover/slowmotion.webp",
      id: "2",
    },
    {
      name: "Lofi Study",
      author: "FASSounds",
      genre: "Beats",
      audio: "./music/lofi-study.mp3",
      album_img: "./imgs/lofi-study.png",
      id: "3",
    },
    {
      name: "Into The Night",
      author: "prazkhanal",
      genre: "Eletronic",
      audio: "./music/into-the-night.mp3",
      album_img: "./imgs/intothenight.png",
      id: "4",
    },
    {
      name: "Acoustic",
      author: "Coma-Media",
      genre: "Ambient",
      audio: "./music/acoustic-motivation.mp3",
      album_img: "https://cdn.bensound.com/image/cover/newdawn.webp",
      id: "5",
    },
    {
      name: "Better Days",
      author: "Benjamin Tissot",
      genre: "Ambient",
      audio: "./music/betterdays.mp3",
      album_img: "https://cdn.bensound.com/image/cover/betterdays.webp",
      id: "6",
    },
    {
      name: "Spirit Blossom",
      author: "RomanBelov",
      genre: "Beats",
      audio: "./music/spirit-blossom.mp3",
      album_img: "./imgs/spirit.png",
      id: "7",
    },
    {
      name: "The Introvert",
      author: "MichaelKobrin",
      genre: "Classic",
      audio: "./music/the-introvert.mp3",
      album_img: "./imgs/piano.png",
      id: "8",
    },
    {
      name: "In My Heart",
      author: "ZakharValaha",
      genre: "Classic",
      audio: "./music/you-live-in-my-heart.mp3",
      album_img: "./imgs/youliveinmyheart.png",
      id: "9",
    },
  ];
  const [id, setId] = useState<string>("");
  const [isFull, setIsFull] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const songSource = "kancelar.mp3"; // mock data
  const { mp3BlobUrl, isError, isLoading } = useGetSong(songSource);

  // mock data
  const audio = {
    url: mp3BlobUrl,
    title: "Kancelář",
    author: "Ektor",
    thumbnail: "fantaziaCover.jpg",
  };

  return (
    <div className="container mx-auto text-center">
      <div className="md:w-1/2 lg:w-1/3 mx-auto">
        {isError && <div>Error fetching song data</div>}
        {isLoading && <div>Loading song data...</div>}
        {mp3BlobUrl && !isError && !isLoading && (
          <AudioPlayer
            url={mp3BlobUrl}
            title={audio.title}
            author={audio.author}
            thumbnail={audio.thumbnail}
          />
        )}
      </div>
      <div className="divSongs">
        <C.Music>
          {musics.map((music) => (
            <MusicList
              key={music.id}
              img={music.album_img}
              name={music.name}
              author={music.author}
              audio={music.audio}
              genre={music.genre}
              setId={setId}
              musicId={music.id}
              id={id}
              setIsFull={setIsFull}
              isFull={isFull}
              genres={genre}
              isSearch={isSearch}
              search={search}
              windowWidth={windowWidth}
            />
          ))}
        </C.Music>
      </div>
    </div>
  );
};
