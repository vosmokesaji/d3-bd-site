export type DiabloItemQuality = "common" | "crafted" | "legendary" | "set";
export type DiabloItemShape = "default" | "square" | "big" | "fill";
export type DiabloItemFrameSize = "sm" | "md" | "lg" | "fill";

export type DiabloItemSocket = {
  image: string;
  label: string;
};

export function itemFrameShapeForSlot(slot?: string): DiabloItemShape {
  if (["颈部", "手指", "腰部", "魔女法器", "盗贼徽记", "圣殿骑士圣物"].includes(slot ?? "")) return "square";
  if (slot === "胸部") return "big";
  return "default";
}

export function DiabloItemFrame({
  image,
  quality,
  shape = "default",
  size = "md",
  sockets = [],
  className = "",
  label,
  fit = "native",
}: {
  image: string;
  quality: DiabloItemQuality;
  shape?: DiabloItemShape;
  size?: DiabloItemFrameSize;
  sockets?: DiabloItemSocket[];
  className?: string;
  label?: string;
  fit?: "native" | "contain";
}) {
  return (
    <span
      className={`diablo-item-frame frame-shape-${shape} frame-size-${size} quality-${quality} frame-fit-${fit} ${className}`.trim()}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span className="diablo-item-frame-surface">
        <span className="diablo-item-frame-image"><img src={image} alt="" /></span>
        <span className="diablo-item-frame-sheen" aria-hidden="true" />
      </span>
      {sockets.length > 0 && (
        <span className="diablo-item-frame-sockets" aria-label={sockets.map((socket) => socket.label).join("、")}>
          {sockets.map((socket, index) => <span key={`${socket.label}-${index}`}><img src={socket.image} alt="" /></span>)}
        </span>
      )}
    </span>
  );
}
