import { randomGaussion } from './utils.js';

const ORIGINAL_COUNT = 50;          // 初始感染数量
const BROAD_RATE = 0.8;             // 传播率
const SHADOW_TIME_GEN = (function* () { while(1) { yield getShadowTime() } })();    // 潜伏时间, 单位天
const HOSPITAL_RECEIVE_TIME = 10;   // 医院收治响应时间
const BED_COUNT = 100;             // 医院床位
const U = -0.99;                    // 流动意向平均值
const CITY_PERSON_SIZE = 5000;      // 城市总人口数量

// 潜伏期主要为 3-7 天
function getShadowTime () {
    let day = 5 + randomGaussion() * 2;
    day = day < 0 ? 0 : day;
    return Math.floor(day);
}

export {
    ORIGINAL_COUNT,
    BROAD_RATE,
    SHADOW_TIME_GEN,
    HOSPITAL_RECEIVE_TIME,
    BED_COUNT,
    U,
    CITY_PERSON_SIZE
}