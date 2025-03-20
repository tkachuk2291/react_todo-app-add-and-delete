import { Todo } from '../../types/Todo';
import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export interface TodoListProps {
  filteredTodos: Todo[];
  tempTodo : Todo | null
  isLoading : boolean
  loadingTodoId : number | null
  deleteTodo: (todoId : number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ filteredTodos , tempTodo , isLoading , deleteTodo , loadingTodoId  }) => {
  console.log(isLoading , 'В ЛСИТЕ ЧЕ ПРИШЛО?')
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/*This is a completed todo */}
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo}  deleteTodo={deleteTodo} isLoading={loadingTodoId === todo.id}/>;
      })}
      {tempTodo !== null && (
        <TodoItem key={tempTodo.id} todo={tempTodo} isLoading={isLoading} />
      )}
</section>
)
  ;
};
