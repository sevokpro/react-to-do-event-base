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
        name: 'lol',
        uuid: Math.random()
    },{
        description: 'lol2',
        completeTime: null,
        deadLine: null,
        priory: "important",
        name: 'lol2',
        uuid: Math.random()
    },{
        description: 'lol3',
        completeTime: null,
        deadLine: null,
        priory: "veryImportant",
        name: 'lol3',
        uuid: Math.random()
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
                        element.uuid =
                            Math.random()
                        next.push(element);
                        break;
                    case "update":
                        const index =
                            next
                                .findIndex( el => element.uuid === el.uuid )

                        next[index] =
                            element
                        break;
                }
                this.taskList.next(next)
            })
    }

    addTask(task: ITask){
        this.storagePatcher('add', task)
    }

    updateTask(task: ITask){
        this.storagePatcher("update", task)
    }
}

export { TaskListManager }