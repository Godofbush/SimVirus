import { CITY_PERSON_SIZE } from './constants.js';
import { randomGaussion } from './utils.js';
import City from './City.js';
import Person from './Person.js';

class PersonPool {
    constructor () {
        this._instance = null;
        this._personList = [];

        // 初始化市民
        const city = new City(400, 400);
        for (let i = 0; i < CITY_PERSON_SIZE; i++) {
            let x = 100 * randomGaussion() + city.centerX;
            let y = 100 * randomGaussion() + city.centerY;
            if (x > 700) {
                x = 700;
            }
            this._personList.push(new Person(city, x, y));
        }
    }

    static getInstance () {
        if (!this._instance) {
            this._instance = new PersonPool();
        }
        return this._instance;
    }

    get personList () {
        return this._personList;
    }

    /**
     * @param {number} state 市民类型 Person.State 的值
     * @return 获取指定人群数量
     */
    getPeopleSize (state) {
        if (state == -1) {
            return CITY_PERSON_SIZE;
        }
        return this._personList.filter(p => p.state === state).length;
    }
}

export default PersonPool;