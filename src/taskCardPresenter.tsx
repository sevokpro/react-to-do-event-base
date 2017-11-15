import * as React from "react";
import {PureComponent} from "react";
import {ITask} from "./ITask";
import {TaskPrioryVendor} from "./taskStatusVendor";

class TaskCardPresenter extends PureComponent<{
    task: ITask,
    taskPrioryList: TaskPrioryVendor,
    inputCompleteEmitter: {
        emit: (task: ITask) => void
    }
}>{
    prioryList;
    constructor(props){
        super(props);

        this
            .props
            .taskPrioryList
            .whenStatusListChange
            .subscribe( next => {
                this.prioryList =
                    next
                this.forceUpdate()
            })
    }
    whenOkButtonClick =
        () => this.props.inputCompleteEmitter.emit(null)
    render(){
        return (
            <div>
                <div>
                    <label htmlFor="">Name</label>
                    <br/>
                    <input type="text"/>
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <br/>
                    <textarea></textarea>
                </div>
                <div>
                    <label htmlFor="">Complete time</label>
                    <br/>
                    <input type="datetime-local"/>
                </div>
                <div>
                    <label htmlFor="">Dead line</label>
                    <br/>
                    <input type="datetime-local"/>
                </div>
                <div>
                    <label htmlFor="">Priory</label>
                    <br/>
                    <select name="" id="">
                        {this.prioryList && this.prioryList.map(el => {
                            return <option>{el}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={this.whenOkButtonClick}>ok</button>
                </div>
            </div>
        )
    }
}

export {TaskCardPresenter}