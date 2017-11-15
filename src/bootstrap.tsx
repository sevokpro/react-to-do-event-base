import * as React from "react"
import {PureComponent} from "react";
import {TaskListPresenter} from "./taskListPresenter";
import {ITask} from "./ITask";
import {TaskCardPresenter} from "./taskCardPresenter";
import {TaskListFilter} from "./taskListFilter";
import {TaskPrioryVendor} from "./taskStatusVendor";
import {BorderContainer} from "./borderContainer";
import {TaskListManager} from "./taskListManager";
import {ReplaySubject} from "rxjs/ReplaySubject";

class Bootstrap extends PureComponent{
    private taskListManager: TaskListManager =
        new TaskListManager();

    private taskPrioryVendor: TaskPrioryVendor =
        new TaskPrioryVendor();

    private whenTaskPrioryChange =
        new ReplaySubject(1);
    private taskStatusChangeEmitter: (value) => void =
        value => {
            this.whenTaskPrioryChange.next(value)
        };

    private taskList =
        this.taskListManager
            .whenTaskListChange
            .combineLatest(this.whenTaskPrioryChange)
            .map( ([taskList, prioryFilter]) => {
                if(prioryFilter === 'all'){
                    return taskList
                }
                return taskList.filter( el => el.priory === prioryFilter )
            } );

    private createNewTaskEmitter =
        {
            emit: task => console.log(task)
        }


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
                <BorderContainer>
                    <div>Create task:</div>
                    <TaskCardPresenter task={this.emptyTask} taskPrioryList={this.taskPrioryVendor} inputCompleteEmitter={this.createNewTaskEmitter}/>
                </BorderContainer>
                <BorderContainer>
                    <TaskListFilter prioryVendor={this.taskPrioryVendor} changeFilterValueEmitter={this.taskStatusChangeEmitter}/>
                    <TaskListPresenter list={this.taskList}/>
                </BorderContainer>
            </div>
        )
    }
}

export { Bootstrap }