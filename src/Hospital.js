import { BED_COUNT } from './constants.js';
import Bed from './Bed.js';
import Point from './Point.js';

class Hospital {
    constructor () {
        this._instance = null;

        this._x = 800;
        this._y = 110;

        this._width = 0;
        this._height = 606;

        // 初始化医院病床
        this._beds = [];
        let point = new Point(800, 100);

        if (BED_COUNT === 0) {
            this._width = 0;
            this._height = 0;
        }
        let column = BED_COUNT / 100;
        this._width = column * 6;

        for (let i = 0; i < column; i++) {

            for (let j = 10; j <= 610; j += 6) {
                if (this._beds.length >= BED_COUNT) break;

                let bed = new Bed(point.x + i * 6, point.y + j);
                this._beds.push(bed);
            }

        }
    }

    static getInstance () {
        if (!this._instance) {
            this._instance = new Hospital();
        }
        return this._instance;
    }

    get width () {
        return this._width;
    }

    get height () {
        return this._height;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    pickBed () {
        for (let i = 0; i < this._beds.length; i++) {
            if (this._beds[i].isEmpty === false) continue;
            return this._beds[i];
        }
        return null;
    }
}

export default Hospital;