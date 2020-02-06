import Point from './Point.js';

class Bed extends Point {
    constructor (x, y) {
        super(x, y);

        this._isEmpty = true;
    }

    get isEmpty () {
        return this._isEmpty;
    }

    set empty (empty) {
        this._isEmpty = empty;
    }
}

export default Bed;