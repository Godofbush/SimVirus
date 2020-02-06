import { ORIGINAL_COUNT } from './src/constants.js';
import MyPanel from './src/MyPanel.js';
import PersonPool from './src/PersonPool.js';

const myPanel = new MyPanel('#app');
myPanel.run();

// 初始化感染者
let people = PersonPool.getInstance().personList;  // 获取所有的市民
for (let i = 0; i < ORIGINAL_COUNT; i++) {
    let person;
    do {
        person = people[Math.floor((people.length - 1) * Math.random())];   // 随机挑选一个市民
    } while (person.isInfected());  // 如果该市民已经被感染，重新挑选
    person.beInfected(); // 让这个幸运的市民成为感染者
}