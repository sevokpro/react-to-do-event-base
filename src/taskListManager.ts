import {Observable} from "rxjs";
import {ITask} from "./ITask";
import {Subject} from "rxjs";
import {BehaviorSubject} from "rxjs";

class TaskListManager{
    mockTaskList: Array<ITask> = [{
        description: 'lol',
        completeTime: null,
        deadLine: null,
        priory: "base",
        name: 'lol'
    },{
        description: 'lol2',
        completeTime: null,
        deadLine: null,
        priory: "important",
        name: 'lol2'
    },{
        description: 'lol3',
        completeTime: null,
        deadLine: null,
        priory: "veryImportant",
        name: 'lol3'
    }];

    constructor(){
        this
            .mockTaskList
            .forEach( el => this.addTask(el))
    }
    private taskList: Subject<Array<ITask>> =
        new BehaviorSubject([]);

    whenTaskListChange: Observable<Array<ITask>> =
        this
            .taskList
            .asObservable()

    storagePatcher(patchType: 'add' | 'update' | 'delete', element: ITask){
        this
            .taskList
            .first()
            .subscribe( next => {
                switch (patchType){
                    case 'add':
                        next.push(element);
                        break;
                }
            })
    }

    addTask(task: ITask){
        this.storagePatcher('add', task)
    }
}

export { TaskListManager }