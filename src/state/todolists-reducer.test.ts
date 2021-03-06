import { RequestStatusType } from './app-reducer';
import { addTodolistAC, changeTodolistAC, changeTodolistFilterAC, FilterValueType, removeTodolistAC, setTodolistsAC, todolistsReducer, TodolistType, changeTodolistEntytiStatusAC } from './todolists-reducer';
import { v1 } from 'uuid';


let todolistId1:string
let todolistId2:string
let startState: Array<TodolistType>

beforeEach(()=>{
    todolistId1=v1()  
    todolistId2=v1()
    startState=[
        { id: todolistId1, title: "What to learn", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0 }
    ]

})

test('correct todolist should be removed', () => {
  
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC({
        id: "gtrgrgrgg",
        title: newTodolistTitle,
        filter: "all",
        entytiStatus: 'idle',
        addedDate: "",
        order: 0,
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
   
    let newFilter: FilterValueType = "completed";

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entyti status of todolist should be changed', () => {
 
    let newStatus: RequestStatusType = 'loading';

    const endState = todolistsReducer(startState, changeTodolistEntytiStatusAC(todolistId2, newStatus));

    expect(endState[0].entytiStatus).toBe('idle');
    expect(endState[1].entytiStatus).toBe(newStatus);
});

test('todolists should be set to the state', () => {
  
    const endState = todolistsReducer([], setTodolistsAC(startState));

    expect(endState.length).toBe(2);

});



