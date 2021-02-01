export interface DateFirebase {
  seconds: number;
  nanoseconds: number;
}

export interface Data {
  weight: string;
  date: DateFirebase;
  bmi: string;
}

export interface UserData extends firebase.User {
  height: string;
  weightGoal: string;
  data: Data[];
}

export interface ToastType {
  text: string;
  type?: string;
}
