function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline:
      "border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;