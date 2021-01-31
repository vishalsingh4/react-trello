const mockData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Get the business requirement' },
      'task-2': { id: 'task-2', content: 'Set up boiler plate code' },
      'task-3': { id: 'task-3', content: 'Complete pending stories' },
      'task-4': { id: 'task-4', content: 'Make tea' },
      'task-5': { id: 'task-5', content: 'Clean bed' },
      'task-6': { id: 'task-6', content: 'Take some rest' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-2', 'task-3', 'task-4', 'task-5']
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: ['task-1']
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: ['task-6']
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  }
  
  export default mockData
  