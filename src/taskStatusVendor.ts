import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

class TaskPrioryVendor{
    whenStatusListChange: Observable<Array<string>> =
        new BehaviorSubject(['base', 'important', 'veryImportant'])
            .asObservable()
}

export {TaskPrioryVendor}