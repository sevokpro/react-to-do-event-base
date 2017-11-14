import * as React from "react"
import {PureComponent} from "react";
import {TaskListPresenter} from "./taskListPresenter";
import {Observable} from "rxjs";
import {ITask} from "./ITask";
import {TaskCardPresenter} from "./taskCardPresenter";
import {TaskListFilter} from "./taskListFilter";
import {TaskStatusVendor} from "./taskStatusVendor";

class Bootstrap extends PureComponent{
    private taskList: Observable<Array<ITask>> =
        Observable
            .interval(1e3)
            .map( next => Math.floor(Math.random() * 10) )
            .switchMap( next => Observable
                .range(0, next)
                .map(next => ({completeTime: null, deadLine: null, description: null, priory: "base", name: 'any'} as ITask))
                .toArray());

    private taskStatusVendor: TaskStatusVendor =
        new TaskStatusVendor();

    private taskStatusChangeEmitter: (value) => void =
        value => {
            console.log(value);
        };

    private emptyTask: ITask =
        {
            priory: null,
            description: null,
            deadLine: null,
            completeTime: null,
            name: null
        };

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div>Hello world</div>
                <TaskCardPresenter task={this.emptyTask}/>
                <TaskListFilter statusVendor={this.taskStatusVendor} changeFilterValueEmitter={this.taskStatusChangeEmitter}/>
                <TaskListPresenter list={this.taskList}/>
            </div>
        )
    }
}

export { Bootstrap }