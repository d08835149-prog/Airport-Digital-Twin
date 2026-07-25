type Props = {
  x: number;
};

export default function Aircraft({ x }: Props) {
  return (
    <div
      className="absolute top-[45%] z-10 text-3xl transition-all duration-500"
      style={{ left: `${x}px` }}
    >
      ✈️
    </div>
  );
}