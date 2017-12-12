import * as React from "react";
import {PureComponent} from "React"
import {ITask} from "./ITask";
import {Observable} from "rxjs/Observable";

class TaskListPresenter extends PureComponent<{
    list: Observable<Array<ITask>>,
    taskClickEmitter: {emit: (task: ITask) => void}
}>{
    taskList: Array<ITask>;

    constructor(props){
        super(props);
        this
            .props
            .list
            .subscribe( next => {
                this.taskList = next;
                this.forceUpdate()
            })
    }

    render(){
        return (
            <ul>
                {this.taskList && this.taskList.map(el => {
                    return <li onClick={this.props.taskClickEmitter.emit.bind(this.props.taskClickEmitter, el)}>{el.name}</li>
                })}
            </ul>
        )
    }
}

export {TaskListPresenter}