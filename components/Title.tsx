export interface TitleProps {}

export const Title = ({}: TitleProps) => {
  return (
    <div className="">
      <div className="font-bold text-4xl py-4">📻Juke Box📻</div>
      <div className="">
        An onchain record of social music interest. Biased with who uses it.
        Select the contracts current song, or add one you'd like using spotify{" "}
        <span className="text-[#1DB954] text-xs">
          {" "}
          https://open.spotify.com/track/15OlC497ScJt9N2BS8lOev?si=f99d587b90644e30
        </span>
      </div>
    </div>
  );
};

export default Title;
