import * as React from "react";
import {PureComponent} from "react";
import {ITask} from "./ITask";

class TaskCardPresenter extends PureComponent<{task: ITask}>{
    render(){
        return (
            <div>
                <input type="text"/>
                <textarea></textarea>
            </div>
        )
    }
}

export {TaskCardPresenter}