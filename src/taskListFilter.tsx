import * as React from "react"
import {PureComponent} from "react";
import {TaskStatusVendor} from "./taskStatusVendor";

class TaskListFilter extends PureComponent<{statusVendor: TaskStatusVendor, changeFilterValueEmitter: (emit: string) => void}>{
    statusList: Array<string>;
    constructor(props){
        super(props)
        this
            .props
            .statusVendor
            .whenStatusListChange
            .map( next => ['all', ...next])
            .subscribe( next => {
                this.statusList = next;
                this.props.changeFilterValueEmitter(next[0])
                this.forceUpdate()
            })
    }
    changeValueHandler(event){
        this.props.changeFilterValueEmitter(event.target.value)
    }
    render() {
        return (
            <select onChange={this.changeValueHandler.bind(this)}>
                {this.statusList && this.statusList.map(el => {
                    return <option>{el}</option>
                })}
            </select>
        )
    }
}

export {TaskListFilter}