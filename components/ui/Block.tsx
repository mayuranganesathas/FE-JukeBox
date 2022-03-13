export interface BlockProps {
  //   backgroundImage: any;
  //   songTitle: string;
  //   artistName: string;
  //   transactionId: any;
  playButton: () => void;
}

export const Block = ({
  playButton,
}: //   backgroundImage,
//   songTitle,
//   artistName,
//   transactionId,
BlockProps) => {
  return (
    <div className=" flex justify-center py-4 flex-wrap">
      <div className="w-56 h-1/2 border-8 border-black border-dotted">
        Background Image
        <div>Song Title</div>
        <div>Artist Name</div>
        <div>Transaction Details</div>
        <div>
          <button
            className="hover:text-red-500 hover:cursor-pointer bg-cyan-200"
            onClick={playButton}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Block;
