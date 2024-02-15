function CardImage({ src, alt }) {
  return (
    <img
      className="mb-4 mt-2 h-[281px] w-[193px]"
      alt={alt}
      src={src}
      onError={(e) => {
        e.target.onError = null;
        e.target.src = "/no-image.jpg";
        e.target.className = "mb-4 mt-2 h-[281px] w-[281px]";
      }}
    />
  );
}

export default CardImage;
