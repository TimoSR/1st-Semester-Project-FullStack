import { makeObservable, observable, action, makeAutoObservable } from 'mobx';


export default class ActivityStore {
    title: string = 'Hello from MobX';

    constructor() {

        /**
         * Alternative to makeObservable
         */
        makeAutoObservable(this)


        // makeObservable(this, {
        //     title: observable,
        //     //setTitle: action.bound
        //     setTitle: action
        // })
    }


    // setTitle() {
    //     this.title = this.title + '!';
    // }

    /** 
     * By using lamda functions we autobind the function to the class
     * Therefore by using lamda functions we don't need to bind setTitle in makeObservable
     */
    setTitle = () => {
        this.title = this.title + '!';
    }

}