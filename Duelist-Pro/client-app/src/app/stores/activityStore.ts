import { makeObservable, observable, action } from 'mobx';


export default class ActivityStore {
    title: string = 'Hello from MobX';

    constructor() {
        makeObservable(this, {
            title: observable,
            //setTitle: action.bound
            setTitle: action
        })
    }


    // setTitle() {
    //     this.title = this.title + '!';
    // }

    /** By using lamda functions we autobind it to the class */

    setTitle = () => {
        this.title = this.title + '!';
    }

}