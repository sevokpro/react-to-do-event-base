import * as React from "react";
import {PureComponent} from "React"
import {ITask} from "./ITask";
import {Observable} from "rxjs/Observable";

class TaskListPresenter extends PureComponent<{list: Observable<Array<ITask>>}>{
    constructor(props){
        super(props);
        this
            .props
            .list
            .subscribe( next => {
                console.log(next);
            })
    }
    shouldComponentUpdate(){
        return false
    }
    render(){
        return (
            <ul>
                <li>item1</li>
                <li>item2</li>
            </ul>
        )
    }
}

export {TaskListPresenter}