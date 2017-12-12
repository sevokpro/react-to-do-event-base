interface ITask{
    name: string
    description: string,
    completeTime: Date,
    deadLine: Date,
    priory: 'base' | 'important' | 'veryImportant',
    uuid?: any
}

export {ITask}