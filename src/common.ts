export const getRandomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const createDiv = (host: HTMLElement, className: string): HTMLElement => {
  const div = document.createElement("div");
  div.className = className;
  host.appendChild(div);

  return div;
};

export const createLabel = (host: HTMLElement, className?: string): HTMLElement => {
  const lbl = document.createElement("label");
  if (typeof className !== "undefined") {
    lbl.className = className;
  }
  host.appendChild(lbl);

  return lbl;
};