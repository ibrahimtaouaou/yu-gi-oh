import star from "/Level.png";

function Star({ level }) {
  const arr = Array.from(Array(level).keys());
  return (
    // <div className={`grid auto-cols-fr grid-flow-col items-center self-center`}>
    <div className={`m-auto flex flex-wrap self-center `}>
      {arr.map((lvl) => (
        <img src={star} alt={lvl} key={lvl} className="h-6 w-6 " />
      ))}
    </div>
  );
}

export default Star;
