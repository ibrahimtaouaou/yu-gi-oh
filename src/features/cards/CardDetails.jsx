import Attributes from "../../helper/Attributes";
import Star from "../../helper/Star";

function CardDetails({ card }) {
  const headStyles =
    "text-l font-semibold uppercase [font-family:'Roboto-Bold',Helvetica] overflow-auto px-4";
  const resStyles =
    "text-sm opacity-50 [font-family:'Roboto-Bold',Helvetica] break-words items-center px-4 overflow-auto";
  return (
    <div className="grid grid-flow-row grid-cols-2 divide-x divide-y overflow-auto bg-zinc-300">
      <div className="flex flex-col items-center">
        <p className={`${headStyles}`}>Type</p>
        <p className={`${resStyles}`}>{card.type}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className={`${headStyles}`}>Race</p>
        <p className={`${resStyles}`}>{card.race}</p>
      </div>
      {card?.archetype ? (
        <div className="col-span-2 flex flex-col items-center">
          <span className={`${headStyles}`}>Archetype</span>
          <span className={`${resStyles}`}>{card.archetype}</span>
        </div>
      ) : (
        ""
      )}
      {card?.attribute ? (
        <div className="col-span-2 flex flex-col items-center">
          <p className={`${headStyles}`}>Attribute</p>
          <Attributes attribute={card.attribute} />
        </div>
      ) : (
        ""
      )}
      {card?.level ? (
        <div className="col-span-2 flex flex-col">
          <p className={`${headStyles} self-center`}>Level</p>
          <Star level={card.level} />
        </div>
      ) : (
        ""
      )}
      {card?.atk ? (
        <div className="flex flex-col items-center">
          <p className={`${headStyles}`}>Atk</p>
          <span className={`${resStyles}`}>{card.atk}</span>
        </div>
      ) : (
        ""
      )}
      {card?.def ? (
        <div className="flex flex-col items-center">
          <p className={`${headStyles}`}>Def</p>
          <span className={`${resStyles}`}>{card.def}</span>
        </div>
      ) : (
        ""
      )}
      {card?.type?.includes("Link") ? "" : ""}
      {card?.card_sets ? (
        <div className="col-span-2 flex flex-col items-center">
          <p className={`${headStyles}`}>Sets</p>
          <span className={`${resStyles}`}>
            {card.card_sets.map((set) => set.set_code).join(", ")}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="col-span-2 flex flex-col items-center">
        <p className={`${headStyles}`}>Description</p>
        {card?.monster_desc ? (
          <>
            <span>[ Monster Effect ]</span>
            <p className={`${resStyles}`}>{card.monster_desc}</p>
            <span>[ Pendulum Effect ]</span>
            <p className={`${resStyles}`}>{card.pend_desc}</p>
          </>
        ) : (
          <p className={`${resStyles}`}>{card.desc}</p>
        )}
      </div>
    </div>
  );
}

export default CardDetails;
