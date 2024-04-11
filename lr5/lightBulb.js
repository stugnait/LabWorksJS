const lightBulb = document.getElementById('lightBulb')
const bulbTypeSelector = document.getElementById('bulbTypeChanger')
const lightBulbLayer = document.getElementById('lightBulbLayer')
const lightBulbBright = document.getElementById("lightBulbBright")
const sliderElement = document.getElementById("my-slider");
const sliderValueElement = document.getElementById("slider-value");


sliderElement.addEventListener("input", () => {
    const currentValue = sliderElement.value;
    sliderValueElement.textContent = currentValue;
    if (lightBulb.status) {
        lightBulbBright.style.backgroundColor = `rgba(0, 0, 0, ${0.8 - currentValue / 100})`
    }
    console.log(currentValue)
});

const toggleLight = () => {
    lightBulb.status = !lightBulb.status;

    if (lightBulb.status) {
        lightBulb.classList.add("on");
        lightBulb.classList.remove("off");
        lightBulbLayer.classList.remove(lightBulbLayer.classList[0]);
        lightBulbLayer.classList.add(lightBulb.type);
        setTimeout(toggleLight, 3000000)
    } else {
        lightBulb.classList.remove("on");
        lightBulb.classList.add("off");
        lightBulbLayer.classList.remove(lightBulb.type)
    }
};
bulbTypeSelector.addEventListener("input", (event) => {
    lightBulb.type = event.target.value;
    lightBulb.status = false;
});
