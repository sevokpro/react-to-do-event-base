import * as React from "react"
import {Component} from "react";
import {render} from "react-dom";
import {TaskListPresenter} from "./taskListPresenter";
import {Observable} from "rxjs";
import {ITask} from "./ITask";

class Bootstrap extends Component{
    private taskList: Observable<Array<ITask>> =
        Observable
            .interval(1e3)
            .map( next => Math.floor(Math.random() * 10) )
            .switchMap( next => Observable
                .range(0, next)
                .map(next => ({completeTime: null, deadLine: null, description: null, priory: "base", name: 'any'} as ITask))
                .toArray())

    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div>Hello world</div>
                <TaskListPresenter list={this.taskList}/>
            </div>
        )
    }
}

render(
    <Bootstrap />,
    document.body
)