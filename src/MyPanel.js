import { CITY_PERSON_SIZE, BED_COUNT } from './constants.js';
import Hospital from './Hospital.js';
import PersonPool from './PersonPool.js';
import Person from './Person.js';

class MyPanel {
    constructor (CSSselector) {
        let container = document.querySelector(CSSselector);
        if (!container) return;

        this._$canvas = document.createElement('canvas');
        container.appendChild(this._$canvas);

        this._$canvas.width = '1000';
        this._$canvas.height = '800';

        this._width = parseFloat(window.getComputedStyle(this._$canvas).width);
        this._height = parseFloat(window.getComputedStyle(this._$canvas).height);

        this._ctx = this._$canvas.getContext('2d');

        this._pIndex = 0;
        this._timer = null;
        
        MyPanel.worldTime = 0;
    }

    paint () {
        // 清空画布
        this._ctx.clearRect(0, 0, this._width, this._height);

        // set background color
        this._ctx.fillStyle = '#111111';
        this._ctx.fillRect(0, 0, this._width, this._height);

        this._ctx.strokeStyle = '#00ff00';  // 设置医院边界颜色
        // 绘制医院边界
        this._ctx.strokeRect(Hospital.getInstance().x, Hospital.getInstance().y, Hospital.getInstance().width, Hospital.getInstance().height);
        this._ctx.font = 'bold 16 微软雅黑';
        this._ctx.fillStyle = '#00ff00';
        this._ctx.fillText('医院', Hospital.getInstance().x + Hospital.getInstance().width / 4, Hospital.getInstance().y - 16);

        let people = PersonPool.getInstance().personList;
        if (people == null) {
            return;
        }
        people[this._pIndex].update();
        people.forEach((person) => {
            this._ctx.beginPath();
            switch (person.state) {
                case Person.State.NORMAL: {
                    this._ctx.fillStyle = '#dddddd';
                    break;
                }
                case Person.State.SHADOW: {
                    this._ctx.fillStyle = '#ffee00';
                    break;
                }
                case Person.State.CONFIRMED:
                    this._ctx.fillStyle = '#ff0000';
                    break;
                case Person.State.FREEZE: {
                    this._ctx.fillStyle = '#48FFFC';
                    break;
                }
            }
            person.update();
            this._ctx.arc(person.x + 1, person.y + 1, 1, 0, 2 * Math.PI);
            this._ctx.fill();
        });
        this._pIndex++;
        if (this._pIndex >= people.length) {
            this._pIndex = 0;
        }

        // 显示数据信息
        this._ctx.fillStyle = '#ffffff';
        this._ctx.fillText("城市总人数: " + CITY_PERSON_SIZE, 16, 40);
        this._ctx.fillStyle = '#dddddd';
        this._ctx.fillText("健康者人数: " + PersonPool.getInstance().getPeopleSize(Person.State.NORMAL), 16, 64);
        this._ctx.fillStyle = '#ffee00';
        this._ctx.fillText("潜伏者人数: " + PersonPool.getInstance().getPeopleSize(Person.State.SHADOW), 16, 88);
        this._ctx.fillStyle = '#ff0000';
        this._ctx.fillText("感染者人数: " + PersonPool.getInstance().getPeopleSize(Person.State.CONFIRMED), 16, 112);this._ctx.fillStyle = '#48FFFC';
        this._ctx.fillText("已隔离人数: " + PersonPool.getInstance().getPeopleSize(Person.State.FREEZE), 16, 136);this._ctx.fillStyle = '#00ff00';
        this._ctx.fillText("空余病床数: " + (BED_COUNT - PersonPool.getInstance().getPeopleSize(Person.State.FREEZE)), 16, 160);
    }

    run () {
        this._timer = requestAnimationFrame(() => {
            this.paint();
            MyPanel.worldTime++;

            this.run();
        });
        // this._timer = setInterval(() => {
        //     this.paint();
        //     MyPanel.worldTime++;
        // }, 100);
    }
}

MyPanel.worldTime = 0;

export default MyPanel;