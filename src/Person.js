import { U, HOSPITAL_RECEIVE_TIME, SHADOW_TIME_GEN, BROAD_RATE } from './constants.js';
import { randomGaussion } from './utils.js';
import MyPanel from './MyPanel.js';
import MoveTarget from './MoveTarget.js';
import Hospital from './Hospital.js';
import PersonPool from './PersonPool.js';

class Person {
    constructor (city, x, y) {
        this._city = city;
        this._x = x;
        this._y = y;
        this._sig = 1;

        this._targetXU = 100 * randomGaussion() + x;
        this._targetYU = 100 * randomGaussion() + y;
        this._targetSig = 50;

        this._state = Person.State.NORMAL;

        this._infectedTime = 0;
        this._confirmedTime = 0;

        this._moveTarget = null;
    }

    wantMove() {
        let value = this._sig * randomGaussion() + U;
        return value > 0;
    }

    get state () {
        return this._state;
    }

    set state (state) {
        this._state = state;
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

    isInfected () {
        return this._state >= Person.State.SHADOW;
    }

    beInfected() {
        this._state = Person.State.SHADOW;
        this._infectedTime = MyPanel.worldTime;
    }

    distance(person) {
        return Math.sqrt(Math.pow(this._x - person.x, 2) + Math.pow(this._y - person.y, 2));
    }

    freezy() {
        this._state = Person.State.FREEZE;
    }

    moveTo(x, y) {
        this._x += x;
        this._y += y;
    }

    action() {
        if (this._state == Person.State.FREEZE) {
            return;
        }
        if (!this.wantMove()) {
            return;
        }
        if (this._moveTarget == null || this._moveTarget.isArrived) {

            let targetX = this._targetSig * randomGaussion() + this._targetXU;
            let targetY = this._targetSig * randomGaussion() + this._targetYU;
            this._moveTarget = new MoveTarget(targetX, targetY);

        }

        let dX = this._moveTarget.x - this._x;
        let dY = this._moveTarget.y - this._y;
        let length = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

        if (length < 1) {
            this._moveTarget.arrived = true;
            return;
        }
        let udX = dX / length;
        if (udX == 0 && dX != 0) {
            if (dX > 0) {
                udX = 1;
            } else {
                udX = -1;
            }
        }
        let udY = dY / length;
        if (udY == 0 && udY != 0) {
            if (dY > 0) {
                udY = 1;
            } else {
                udY = -1;
            }
        }

        if (this._x > 700) {
            this._moveTarget = null;
            if (udX > 0) {
                udX = -udX;
            }
        }
        this.moveTo(udX, udY);
    }

    update() {
        // TODO: 找时间改为状态机
        if (this._state >= Person.State.FREEZE) {
            return;
        }
        if (this._state === Person.State.CONFIRMED && MyPanel.worldTime - this._confirmedTime >= HOSPITAL_RECEIVE_TIME) {
            let bed = Hospital.getInstance().pickBed(); // 查找空床位
            if (bed == null) {
                // 没有床位了
                // console.log("隔离区没有空床位");
            } else {
                // 安置病人
                this._state = Person.State.FREEZE;
                this._x = bed.x;
                this._y = bed.y;
                bed.empty = false;
            }
        }
        let shadow_time = SHADOW_TIME_GEN.next();
        if (MyPanel.worldTime - this._infectedTime > shadow_time.value && this._state === Person.State.SHADOW) {
            this._state = Person.State.CONFIRMED;   // 潜伏者发病
            this._confirmedTime = MyPanel.worldTime;  // 刷新时间
        }

        this.action();

        let people = PersonPool.getInstance().personList;
        if (this._state >= Person.State.SHADOW) {
            return;
        }
        people.forEach((person) => {
            if (person.state === Person.State.NORMAL) {
                return;
            }
            let random = Math.random();
            if (random < BROAD_RATE && this.distance(person) < Person.SAFE_DIST) {
                this.beInfected();
            }
        })
    }
}

// 市民状态
Person.State = {
    NORMAL: 0,      // 未被感染
    SHADOW: 1,      // 潜伏者
    CONFIRMED: 2,   // 感染者
    FREEZE: 3       // 已隔离
};

Person.SAFE_DIST = 2;

export default Person;