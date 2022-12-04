export interface IActivity {
    id: string;
    title: string;
    /** Date needs to be of type string
     *  as HTML date requires that to render inside our form
     */
    date: Date | null;
    description: string;
    category: string;
  }
  