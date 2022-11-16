import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

export default class ActivityStore {

    /** Real class data */
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    /** Test Data */
    testTitle: string = 'Hello from MobX';

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

    /** We utilize async await instead of promises */
    loadActivities = async () => {

        this.setLoadingInitial(true);

        try {

            const activities = await agent.Activities.list();

                activities.forEach(activity => {
                /**
                 * Based on the format of the data, we change it to fit the date form. 
                 * (We can inspect it in the Network repsonse from the server)
                 * We split the date based on the T, and take the first part now two elements. 
                 */
                activity.date = activity.date.split('T')[0];
                /** 
                 * Mutating state directly, would seem odd 
                 * would be seen as a anti pattern in redux.
                 * as we would not directly mutate the state
                 * but this is a core pattern of MobX
                 * */
                this.activities.push(activity);
            })

            this.setLoadingInitial(false);
        
        } catch (error) {

            console.log(error);

            this.setLoadingInitial(false);
            
        }
    }


    /** Run in action can get replaced by creating a new action */
    setLoadingInitial = (state: boolean) => {

        this.loadingInitial = state;

    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(activity => activity.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    /** 
     * By using lamda functions we autobind the function to the class
     * Therefore by using lamda functions we don't need to bind setTitle in makeObservable
     */
     setTitle = () => {
        this.testTitle = this.testTitle + '!';
    }

    // setTitle() {
    //     this.title = this.title + '!';
    // }

}