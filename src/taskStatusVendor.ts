import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

class TaskStatusVendor{
    whenStatusListChange: Observable<Array<string>> =
        new BehaviorSubject(['base', 'important', 'veryImportant'])
            .asObservable()
}

export {TaskStatusVendor}