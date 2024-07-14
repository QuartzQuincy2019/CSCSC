//display.js


/**
 * 
 * @param {HSLColor} color 
 * @returns (ELement)
 */
function createColorBlock(color) {
    var _colorBlock = document.createElement("div");
    _colorBlock.classList.add("colorblock");
    _colorBlock.style.backgroundColor = color.colorText();
    _colorBlock.style.borderColor = color.colorText();
    return _colorBlock;
}


function appendColorExplanation(color, destination) {
    var _colorExp = document.createElement("div");
    _colorExp.classList.add("colorexplanation");
    _colorExp.appendChild(createColorBlock(color));
    var _p = document.createElement("div");
    _p.classList.add("colorname");
    let u = hslaToRgba(color.colorText());
    u = u.slice(0, 7);
    _p.innerHTML = u;
    _colorExp.appendChild(_p);
    destination.appendChild(_colorExp);
}