import * as React from "react";
import {PureComponent} from "react";
import {ITask} from "./ITask";
import {TaskPrioryVendor} from "./taskStatusVendor";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

class TaskCardPresenter extends PureComponent<{
    task: ITask,
    taskPrioryList: TaskPrioryVendor,
    inputCompleteEmitter: {
        emit: (task: ITask) => void
    }
}>{
    private prioryList: Array<string> =
        [];

    private whenNameChange: Subject<string> =
        new BehaviorSubject(null);
    private whenDescriptionChange: Subject<string> =
        new BehaviorSubject(null);
    private whenCompleteTimeChange: Subject<Date> =
        new BehaviorSubject(null);
    private whenDeadLineTimeChange: Subject<Date> =
        new BehaviorSubject(null);
    private whenPrioryChange: Subject<string> =
        new BehaviorSubject(null);

    private whenFormModelChange: Observable<ITask> =
        Observable
            .combineLatest(
                this.whenNameChange,
                this.whenDescriptionChange,
                this.whenCompleteTimeChange,
                this.whenDeadLineTimeChange,
                this.whenPrioryChange
            )
            .map( ([name, desc, comlete, deadLine, priory]) =>
                ({
                    name: name,
                    description: desc,
                    completeTime: comlete,
                    deadLine: deadLine,
                    priory: priory
                } as ITask));

    private whenOkButtonClick: Subject<null> =
        new Subject();

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

        this
            .whenOkButtonClick
            .switchMap( next => this.whenFormModelChange.first() )
            .subscribe( next => this.props.inputCompleteEmitter.emit( next ) )
    }

    private valueMulticaster(el: any, stream: Subject<any>, event: string = 'input'): void {
        Observable
            .fromEvent(el, event)
            .pluck('target', 'value')
            .multicast(stream)
            .connect()
    }

    render(){
        return (
            <div>
                <div>
                    <label htmlFor="">Name</label>
                    <br/>
                    <input type="text" ref={ el => this.valueMulticaster(el, this.whenNameChange)}/>
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <br/>
                    <textarea ref={el => this.valueMulticaster(el, this.whenDescriptionChange)}></textarea>
                </div>
                <div>
                    <label htmlFor="">Complete time</label>
                    <br/>
                    <input type="datetime-local" ref={el => this.valueMulticaster(el, this.whenCompleteTimeChange, 'change')}/>
                </div>
                <div>
                    <label htmlFor="">Dead line</label>
                    <br/>
                    <input type="datetime-local" ref={el => this.valueMulticaster(el, this.whenDeadLineTimeChange)}/>
                </div>
                <div>
                    <label htmlFor="">Priory</label>
                    <br/>
                    <select name="" id="" ref={el => this.valueMulticaster(el, this.whenPrioryChange)}>
                        {this.prioryList && this.prioryList.map(el => {
                            return <option>{el}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button ref={el =>
                        Observable
                            .fromEvent(el, 'click')
                            .mapTo(null)
                            .multicast(this.whenOkButtonClick)
                            .connect()}>
                        ok
                    </button>
                </div>
            </div>
        )
    }
}

export {TaskCardPresenter}