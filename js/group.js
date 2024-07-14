//group.js
class ColorGroup {
    sourceColor;
    groupName;
    groupFunc;
    groupValue;
    constructor(groupName, groupFunc) {
        this.groupName = groupName;
        this.groupFunc = groupFunc;
    }
    fillGroup(color) {
        this.sourceColor = color;
        this.groupValue = this.groupFunc(this.sourceColor);
    }
}

var ThreeDimensions = new ColorGroup("Three Dimensions", getThreeDimensions);
var Contrary = new ColorGroup("Contrary", getContrary);
var Square = new ColorGroup("Square", getSquare);
var Pentagon = new ColorGroup("Pentagon", getPentagon);
var LightnessGradient_4 = new ColorGroup("Lightness Gradient 4", getLightnessGradient4);
var LightnessGradient_5 = new ColorGroup("Lightness Gradient 5", getLightnessGradient5);
var SaturationGradient_3 = new ColorGroup("Saturation Gradient 3", getSaturationGradient3);
var SaturationGradient_4 = new ColorGroup("Saturation Gradient 4", getSaturationGradient4);
var CloseNeighbors_5 = new ColorGroup("Close Neighbors 5", getCloseNeighbors5);
var FarNeighbors_5 = new ColorGroup("Far Neighbors 5", getFarNeighbors5);
var NotebookTheme = new ColorGroup("Notebook Theme", getNotebookTheme);
var Shades = new ColorGroup("Shades", getShades);

class ColorGroupsAnalizer {
    sourceColor;
    groups = [ThreeDimensions, Contrary, Square, Pentagon,
        LightnessGradient_4, LightnessGradient_5,
        SaturationGradient_3, SaturationGradient_4,
        CloseNeighbors_5, FarNeighbors_5,
        NotebookTheme, Shades
    ];
    initializeGroups() {
        this.sourceColor = _SOURCE_COLOR;
        for (var i = 0; i < this.groups.length; i++) {
            this.groups[i].fillGroup(this.sourceColor);
        }
    }
    demonstrate() {
        PALLETES.innerHTML = "";
        for (var i = 0; i < this.groups.length; i++) {
            var area = document.createElement("div");
            area.classList.add("grouparea");
            area.style.borderTopColor = _SOURCE_COLOR.colorText();
            var gn = document.createElement("div");
            gn.style.fontWeight = "700";
            gn.style.fontSize = "19px";
            gn.style.textAlign = "center";
            gn.style.fontFamily = "Arial";
            gn.style.color = _SOURCE_COLOR.colorText();
            gn.style.textShadow = "1px 1px 0 #000000";
            gn.innerHTML = this.groups[i].groupName;
            area.appendChild(gn);
            var row = document.createElement("div");
            row.classList.add("row");
            for (var j = 0; j < this.groups[i].groupValue.length; j++) {
                appendColorExplanation(this.groups[i].groupValue[j], row);
            }
            area.appendChild(row);
            PALLETES.appendChild(area);
        }
    }
    refresh() {
        this.initializeGroups();
        this.demonstrate();
    }
}
var CGA = new ColorGroupsAnalizer();


function getThreeDimensions(color) {
    var pure = getPureColor(color);
    let hue0 = pure.hue;
    let hue_A = hue0 + 120;
    let hue_B = hue0 + 240;
    if (hue_A > 359) hue_A -= 360;
    if (hue_B > 359) hue_B -= 360;
    var colorA = new HSLColor(hue_A, 1, 0.5, 1);
    var colorB = new HSLColor(hue_B, 1, 0.5, 1);
    return [pure, colorA, colorB];
}
function getSquare(color) {
    let hue0 = color.hue;
    let hue_A = hue0 + 90;
    let hue_B = hue0 + 90 * 2;
    let hue_C = hue0 + 90 * 3;
    if (hue_A > 359) hue_A -= 360;
    if (hue_B > 359) hue_B -= 360;
    if (hue_C > 359) hue_C -= 360;
    var colorA = new HSLColor(hue_A, color.sat, color.lig, 1);
    var colorB = new HSLColor(hue_B, color.sat, color.lig, 1);
    var colorC = new HSLColor(hue_C, color.sat, color.lig, 1);
    return [color, colorA, colorB, colorC];
}
function getPentagon(color) {
    let hue0 = color.hue;
    let hue_A = hue0 + 72;
    let hue_B = hue0 + 72 * 2;
    let hue_C = hue0 + 72 * 3;
    let hue_D = hue0 + 72 * 4;
    if (hue_A > 359) hue_A -= 360;
    if (hue_B > 359) hue_B -= 360;
    if (hue_C > 359) hue_C -= 360;
    if (hue_D > 359) hue_D -= 360;
    var colorA = new HSLColor(hue_A, color.sat, color.lig, 1);
    var colorB = new HSLColor(hue_B, color.sat, color.lig, 1);
    var colorC = new HSLColor(hue_C, color.sat, color.lig, 1);
    var colorD = new HSLColor(hue_D, color.sat, color.lig, 1);
    return [color, colorA, colorB, colorC, colorD];
}

function getLightnessGradient(color, count) {
    var range = 1 / count;
    var gradients = [];
    var lig0 = color.lig;
    for (var i = 0; i < count; i++) {
        gradients.push(lig0 + range * i);
    }
    for (var i = 0; i < gradients.length; i++) {
        if (gradients[i] > 1) gradients[i] -= 1;
    }
    gradients.sort((a, b) => a - b);
    var output = [];
    for (var i = 0; i < gradients.length; i++) {
        output.push(new HSLColor(color.hue, color.sat, gradients[i], 1));
    }
    return output;
}
function getSaturationGradient(color, count) {
    var range = 1 / count;
    var gradients = [];
    var sat0 = color.sat;
    for (var i = 0; i < count; i++) {
        gradients.push(sat0 + range * i);
    }
    for (var i = 0; i < gradients.length; i++) {
        if (gradients[i] > 1) gradients[i] -= 1;
    }
    gradients.sort((a, b) => a - b);
    var output = [];
    for (var i = 0; i < gradients.length; i++) {
        output.push(new HSLColor(color.hue, gradients[i], color.lig, 1));
    }
    return output;
}

function getLightnessGradient4(color) {
    return getLightnessGradient(color, 4);
}

function getLightnessGradient5(color) {
    return getLightnessGradient(color, 5);
}

function getSaturationGradient3(color) {
    return getSaturationGradient(color, 3);
}

function getSaturationGradient4(color) {
    return getSaturationGradient(color, 4);
}

function getContrary(color) {
    var contraryHue = color.hue + 180;
    if (contraryHue > 359) contraryHue -= 360;
    var contrary = new HSLColor(contraryHue, color.sat, color.lig, 1);
    return [color, contrary];
}

/**
 * 
 * @param {HSLColor} color 
 * @param {number} range 色相(H)角度步长
 * @param {number} count 向一边计算的数量，取值1-3
 */
function getNeighbors(color, range, count) {
    var hue0 = color.hue;
    var largerGradients = [];
    for (var i = 0; i < count; i++) {
        largerGradients.push(hue0 + range * (i + 1));
    }
    for (var i = 0; i < largerGradients.length; i++) {
        largerGradients[i] = largerGradients[i] % 360;
    }
    var smallerGradients = [];
    for (var i = 0; i < count; i++) {
        smallerGradients.push(hue0 - range * (i + 1));
    }
    for (var i = 0; i < smallerGradients.length; i++) {
        if (smallerGradients[i] < 0) {
            smallerGradients[i] = smallerGradients[i] % 360 + 360;
        }
    }
    smallerGradients.push(hue0);
    var final = smallerGradients.concat(largerGradients);
    final.sort((a, b) => a - b);
    var output = [];
    for (var i = 0; i < final.length; i++) {
        output.push(new HSLColor(final[i], color.sat, color.lig, 1));
    }
    return output;
}
function getCloseNeighbors5(color) {
    return getNeighbors(color, 13, 2);
}
function getFarNeighbors5(color) {
    return getNeighbors(color, 29, 2);
}

function getNotebookTheme(color) {
    var pure = getPureColor(color);
    let togVM = pure.hue + 10;
    if (togVM > 359) togVM -= 360;
    var SimDe = new HSLColor(togVM, 1, 1 - color.sat + randomFloat3(0.1, 0.3), 1);
    var SlBG = new HSLColor(togVM, pure.sat * 0.72, randomFloat3(0.93, 0.98), 1);
    let CtUy = pure.hue + 100;
    if (CtUy > 359) CtUy -= 360;
    var Ty = new HSLColor(CtUy, randomFloat3(0.6, 1), randomFloat3(0.28, 0.39), 1);
    return [color, SimDe, SlBG, Ty];
}

function getShades(color) {
    var pure = getPureColor(color);
    var output = [color];
    for (var i = 0; i < 4; i++) {
        output.push(new HSLColor(pure.hue, randomFloat3(0.5, 0.6), randomFloat3(0.2, 0.84), 1));
    }
    return output;
}