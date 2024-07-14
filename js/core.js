
var PALLETES = document.getElementById('palletes');
var colorPicker = document.getElementById('colorPicker');

function isEpsiloned(num) {
    if (num < 1e-4) return true;
    return false;
}


class HSLColor {//HSL(HSV)
    hue;//0 - 359
    sat;//0 - 1
    lig;//0 - 1
    a;//0 - 1
    constructor(hue, sat, lig, a = 1) {
        this.hue = hue;
        if (isEpsiloned(sat)) {
            this.sat = 0;
        } else {
            this.sat = sat;
        }
        if (isEpsiloned(lig)) {
            this.lig = 0;
        } else {
            this.lig = lig;
        }
        this.a = a;
    }
}

const RED = new HSLColor(0, 1, 0.5, 1);
const YELLOW = new HSLColor(60, 1, 0.5, 1);
const GREEN = new HSLColor(120, 1, 0.5, 1);
const CYAN = new HSLColor(180, 1, 0.5, 1);
const BLUE = new HSLColor(240, 1, 0.5, 1);
const MAGENTA = new HSLColor(300, 1, 0.5, 1);

HSLColor.prototype.colorText = function () {
    let sat = this.sat * 100 + "%";
    let lig = this.lig * 100 + "%";
    return "hsla(" + this.hue + "," + sat + "," + lig + "," + this.a + ")";
}

/**
 * 
 * @param {string} hsla 
 * @returns 
 */
function hslaToRgba(hsla) {
    // 将HSLA颜色值转换为RGBA颜色值
    let hslRegex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/;
    let hslMatch = hsla.match(hslRegex);

    if (!hslMatch) {
        return null;
    }

    let h = parseInt(hslMatch[1]) / 360;
    let s = parseInt(hslMatch[2]) / 100;
    let l = parseInt(hslMatch[3]) / 100;
    let a = parseFloat(hslMatch[4]);
    if (s > 1) s = 1;
    if (l > 1) l = 1;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h * 6) % 2 - 1));
    let m = l - c / 2;

    let r, g, b;
    if (h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    // 将RGBA颜色值转换为16进制表示
    let rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    // let rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
    // let rgbaMatch = rgba.match(rgbaRegex);

    // if (!rgbaMatch) {
    //     return null;
    // }

    let rHex = parseInt(r).toString(16).padStart(2, '0');
    let gHex = parseInt(g).toString(16).padStart(2, '0');
    let bHex = parseInt(b).toString(16).padStart(2, '0');
    let aHex = Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0');

    let hexColor = `#${rHex}${gHex}${bHex}${aHex}`;

    return hexColor;
}

function rgbToHsl(rgb) {
    // 将RGB颜色值转换为RGB百分比值
    const r = parseInt(rgb.substring(1, 3), 16) / 255;
    const g = parseInt(rgb.substring(3, 5), 16) / 255;
    const b = parseInt(rgb.substring(5, 7), 16) / 255;

    // 计算RGB颜色值中的最大值和最小值
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // 计算色相
    let h;
    if (max === min) {
        h = 0; // 色相为0
    } else if (max === r) {
        h = ((g - b) / (max - min)) * 60;
    } else if (max === g) {
        h = ((b - r) / (max - min) + 2) * 60;
    } else {
        h = ((r - g) / (max - min) + 4) * 60;
    }

    if (h < 0) {
        h += 360;
    }

    // 计算亮度
    const l = (max + min) / 2;

    // 计算饱和度
    const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
    var output = {
        h: Math.round(h),
        s: s,
        l: l
    };

    return "hsl(" + output.h + "," + output.s + "," + output.l + ")";
}

function splitHSLColorValues(hslColor) {
    // 使用正则表达式匹配HSL颜色文本中的数字部分
    const regex = /(\d+(\.\d+)?)/g;
    const matches = hslColor.match(regex);

    // 提取匹配到的数字部分
    const hue = parseFloat(matches[0]);
    const saturation = parseFloat(matches[1]);
    const lightness = parseFloat(matches[2]);

    return [hue, saturation, lightness];
}


function randomFloat3(min, max) {
    let randomNum = Math.random();
    let result = min + randomNum * (max - min);
    result = parseFloat(result.toFixed(3));
    return result;
}

/**
 * 
 * @param {HSLColor} color 
 */
function getPureColor(color) {
    return new HSLColor(color.hue, 1, 0.5, 1);
}

function isPure(color) {
    if (color.sat == 1) return true;
    return false;
}

function isGray(color) {
    if (color.sat == 0) return true;
    if (color.lig == 0) return true;
    return false;
}


var _SOURCE_COLOR = MAGENTA;

colorPicker.addEventListener('input', function () {
    var selectedColor = colorPicker.value;
    selectedColor = rgbToHsl(selectedColor);
    var colorArr = splitHSLColorValues(selectedColor);
    _SOURCE_COLOR = new HSLColor(colorArr[0], colorArr[1], colorArr[2], 1);
});

document.addEventListener('keydown', function (event) {
    if (event.code == 'r' || event.code == 'R') {
        var selectedColor = colorPicker.value;
        selectedColor = rgbToHsl(selectedColor);
        var colorArr = splitHSLColorValues(selectedColor);
        _SOURCE_COLOR = new HSLColor(colorArr[0], colorArr[1], colorArr[2], 1);
    }
});