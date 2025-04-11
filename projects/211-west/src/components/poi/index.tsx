export const parseTags = (
  tags: string
): {
  stars: number;
  type: string;
  distance: string;
  time: string;
} => {
  const stars = (tags.match(/stars:\s*(\d+)/)?.[1] || '0').trim();
  const type = (tags.match(/type:\s*(.+)/)?.[1] || '').trim();
  const distance = (tags.match(/distance:\s*(.+)/)?.[1] || '').trim();
  const time = (tags.match(/time:\s*(.+)/)?.[1] || '').trim();
  return {
    stars: parseInt(stars),
    type,
    distance,
    time
  };
};

export const Stars = ({ stars }: { stars: number }) => {
  if (!stars) return null;

  return (
    <div className="stars-container">
      {Array.from({ length: stars }).map((_, i) => (
        <span key={i}>⭐</span>
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <span key={i} style={{ paddingTop: 1 }}>
          ☆
        </span>
      ))}
    </div>
  );
};
