import * as React from "react"
import {PureComponent} from "react";
import {TaskPrioryVendor} from "./taskStatusVendor";

class TaskListFilter extends PureComponent<{prioryVendor: TaskPrioryVendor, changeFilterValueEmitter: (emit: string) => void}>{
    prioryList: Array<string>;
    constructor(props){
        super(props)
        this
            .props
            .prioryVendor
            .whenStatusListChange
            .map( next => ['all', ...next])
            .subscribe( next => {
                this.prioryList = next;
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
                {this.prioryList && this.prioryList.map(el => {
                    return <option>{el}</option>
                })}
            </select>
        )
    }
}

export {TaskListFilter}