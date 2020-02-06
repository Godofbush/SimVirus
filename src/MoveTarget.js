class MoveTarget {
    constructor (x, y) {
        this._x = x;
        this._y = y;

        this._arrived = false;
    }

    get x () {
        return this._x;
    }

    set x (x) {
        this._x = x;
    }

    get y () {
        return this._y;
    }

    set y (y) {
        this._y = y;
    }

    get isArrived () {
        return this._arrived;
    }

    set arrived (arrived) {
        this._arrived = arrived;
    }
}

export default MoveTarget;