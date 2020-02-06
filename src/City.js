class City {
    constructor (centerX, centerY) {
        this._centerX = centerX;
        this._centerY = centerY;
    }

    get centerX () {
        return this._centerX;
    }

    set centerX (centerX) {
        this._centerX = centerX;
    }

    get centerY () {
        return this._centerY;
    }

    set centerY (centerY) {
        this._centerY = centerY;
    }
}

export default City;