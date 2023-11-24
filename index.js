const mode = document.querySelector("#mode");
const getColor = document.querySelector("#get-color");
const colorOutput = document.querySelector("#color-output");
const colorInput = document.querySelector("#color-picker");

const modeOptions = [
  "Monochrome",
  "Monochrome-dark",
  "Monochrome-light",
  "Analogic",
  "Complement",
  "Analogic-complement",
  "Triad"
];

const renderModeOptions = () => {
  modeOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    mode.appendChild(optionElement);
  });
};

const output = (selectedMode, color) => {
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedMode}&count=5`)
    .then(response => response.json())
    .then(data => {
      renderColors(data.colors);
      renderColorName(data.colors);
    })
    .catch(error => {
      console.error("Error fetching color scheme:", error);
    });
};

const renderColors = (colors) => {
  colorOutput.innerHTML = "";
  colors.forEach((color, index) => {
    const colorGrid = document.createElement("div");
    colorGrid.classList.add("color-grid");
    colorGrid.style.background = color.hex.value;
    colorGrid.addEventListener("click", () => {
      copyToClipboard(color.hex.value);
    });
    colorOutput.appendChild(colorGrid);
  });
};

const renderColorName = (colors) => {
  colors.forEach((color) => {
    const colorName = document.createElement("p");
    colorName.classList.add("color-name");
    colorName.textContent = color.hex.value;
    colorOutput.appendChild(colorName);
  });
};

const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Hex code copied to clipboard!");
};

getColor.addEventListener("click", () => {
  const selectedMode = mode.value;
  const selectedColor = colorInput.value.slice(1);
  output(selectedMode, selectedColor);
});

renderModeOptions();