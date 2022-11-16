import { makeObservable, observable } from 'mobx';


export default class ActivityStore {
    title: string = 'Hello from MobX';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }

}