export default class ColorService {
    constructor() {
        this.colorValidation = this.colorValidation.bind(this);
    }

    static setTheme(setColor, themeColor) {
        if (!themeColor) {
            return null;
        }

        const arrLettersOfColor = [0, 0, 0]
          
        if (themeColor.length == 6) {
            arrLettersOfColor[0] = parseInt(themeColor[0], 16);
            arrLettersOfColor[1] = parseInt(themeColor[2], 16);
            arrLettersOfColor[2] = parseInt(themeColor[4], 16);
        } else if (themeColor.length == 3) {
            arrLettersOfColor[0] = parseInt(themeColor[0], 16);
            arrLettersOfColor[1] = parseInt(themeColor[1], 16);
            arrLettersOfColor[2] = parseInt(themeColor[2], 16);
        }

        if ((arrLettersOfColor[0] + arrLettersOfColor[1] + arrLettersOfColor[2]) / 3 < 8) {
            setColor({
                color: themeColor,
                textColor: 'ffffff'
            });
        } else {
            setColor({
                color: themeColor,
                textColor: '000000'
            })
        }
    }
    static getBorderBottom(color, hight = 2) {
        return `${hight}px solid ${'#' + color}`;
    }
    static getColorWithOpacity(value, colorDec = '0, 0, 0') {
        return `rgba(${colorDec}, ${value})`
    }
    static getHoverColor(themeColor) {
        console.log(themeColor)
        if (!themeColor) {
            return 'e44db4';
        }

        let hoverColor = ''

        if (themeColor.length == 6) {
            hoverColor += (parseInt(themeColor[0], 16) < 2) ? (parseInt(themeColor[0], 16) + 2).toString(16) : (parseInt(themeColor[0], 16) -2).toString(16);
            hoverColor += themeColor[1]
            hoverColor += (parseInt(themeColor[2], 16) < 2) ? (parseInt(themeColor[2], 16) + 2).toString(16) : (parseInt(themeColor[2], 16) -2).toString(16);
            hoverColor += themeColor[3]
            hoverColor += (parseInt(themeColor[4], 16) < 2) ? (parseInt(themeColor[4], 16) + 2).toString(16) : (parseInt(themeColor[4], 16) -2).toString(16);
            hoverColor += themeColor[5]
        } else if (themeColor.length == 3) {
            hoverColor += (parseInt(themeColor[0], 16) < 2) ? (parseInt(themeColor[0], 16) + 2).toString(16) : (parseInt(themeColor[0], 16) -2).toString(16);
            hoverColor += (parseInt(themeColor[1], 16) < 2) ? (parseInt(themeColor[1], 16) + 2).toString(16) : (parseInt(themeColor[1], 16) -2).toString(16);
            hoverColor += (parseInt(themeColor[2], 16) < 2) ? (parseInt(themeColor[2], 16) + 2).toString(16) : (parseInt(themeColor[2], 16) -2).toString(16);
        }

        return hoverColor;
    }
    static colorValidation(color) {
        return ((/^[a-f0-9]{6}$/iu.test(color)) || (/^[a-f0-9]{3}$/iu.test(color)));
    }
    static convertToLongValue(value) {
        if (!value) {
            return 'e44db4'
        }


        if (value.length !== 3) return value;

        return value[0] + value[0] + value[1] + value[1] + value[2] + value[2] 
    }
    static getColorSave(color) {
        if (this.colorValidation(color)) {
            return color;
        } 

        return 'e44db4'
    }
}