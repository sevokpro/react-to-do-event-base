interface ITask{
    name: string
    description: string,
    completeTime: Date,
    deadLine: Date,
    priory: 'base' | 'important' | 'veryImportant'
}

export {ITask}