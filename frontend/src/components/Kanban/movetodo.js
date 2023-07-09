
const findIndex = (index, column) => {
    let previousTodo = { priority: null, id: null }
    let nextTodo = { priority: null, id: null }
    if (index !== 0) {
        previousTodo = column[index - 1]
    }
    if (index !== column.length - 1 && column.length !== 0) {
        nextTodo = column[index + 1]
    }
    return [previousTodo, nextTodo]
}


export const createData = (result, board) => {
    const todo = board[result.destination.droppableId].todos.find(todo => todo.id == result.draggableId)
    let index = result.destination.index
    let column = board[result.destination.droppableId].todos
    const [toPreviousTodo, toNextTodo] = findIndex(index, column)
    // const [possiblePreviousTodo, possibleNextTodo] = findPossiblePosition(todo, board[result.destination.droppableId].todos, toPreviousTodo, toNextTodo)
    const data = {
        todoId: result.draggableId,
        from: {
            "userId": board[result.source.droppableId].user.id,
            "previousTodo": todo?.previousTodo ? todo.previousTodo : null,
            "nextTodo": todo?.nextTodo ? todo.nextTodo : null
        },
        to: {
            "userId": board[result.destination.droppableId].user.id,
            "previousTodo": toPreviousTodo.id,
            "nextTodo": toNextTodo.id
        }
    }
    return data
}
export const findPossibleIndex = (todo, array, index) => {

    if (todo.priority === array[index - 1]?.priority || array.length === 0) {
        return index
    }

    const sortedTodos = structuredClone(array)
    const priority = ['salary', 'high', 'medium', 'low']
    const indexOfPrio = priority.indexOf(todo.priority)

    const priorityEnds = []
    priorityEnds.push(sortedTodos.indexOf(sortedTodos.findLast(todo => todo?.priority == 'salary')))
    priorityEnds.push(sortedTodos.indexOf(sortedTodos.findLast(todo => todo?.priority == 'high')))
    priorityEnds.push(sortedTodos.indexOf(sortedTodos.findLast(todo => todo?.priority == 'medium')))
    priorityEnds.push(sortedTodos.indexOf(sortedTodos.findLast(todo => todo?.priority == 'low')))

    if (priorityEnds[indexOfPrio] !== -1) {
            return priorityEnds[indexOfPrio]
        }

    else {
        // looking for todo to attach to
        for (let i = indexOfPrio; i >= 0; i--) {
            if (priorityEnds[i] !== -1) {
                return priorityEnds[i] + 1
            }
        }
    }
    return 0
}
