export const getButton = (text: string) => {
  const button = $("<button>");
  button.text(text);
  button.css({
    padding: "6px 18px",
    background: "lightgreen",
    "border-radius": "6px",
    border: "2px solid #000",
  });
  return button;
};
