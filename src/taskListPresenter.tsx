import * as React from "react";
import {PureComponent} from "React"
import {ITask} from "./ITask";
import {Observable} from "rxjs/Observable";

class TaskListPresenter extends PureComponent<{
    list: Observable<Array<ITask>>,
    updateTaskEmitter: {emit: (task: ITask) => void},
    removeTaskEmitter: {emit: (task: ITask) => void}
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
                    return <li>
                        <button onClick={this.props.removeTaskEmitter.emit.bind(this.props.removeTaskEmitter, el)}>remove</button>
                        <span> | </span>
                        <button onClick={this.props.updateTaskEmitter.emit.bind(this.props.updateTaskEmitter, el)}>update</button>
                        <span> | {el.name}</span>
                    </li>
                })}
            </ul>
        )
    }
}

export {TaskListPresenter}