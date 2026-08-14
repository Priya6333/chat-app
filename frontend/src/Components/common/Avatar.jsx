function Avatar({
  src,
  alt = "User",
  size = "md",
  className = "",
}) {
  const sizes = {
    xs: "w-7 h-7",
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover ${className}`}
    />
  );
}

export default Avatar;