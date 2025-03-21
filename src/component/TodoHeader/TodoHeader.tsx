import React, { useEffect, useRef, useState } from 'react';
import { createTodo, USER_ID } from '../../api/todos';
import { Todo } from '../../types/Todo';


export interface TodoHeaderProps {
  setHasTitleError: (titleError: boolean) => void;
  setAddTodoError: (todoAddError: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  resetError : () => void;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
  isLoading : boolean
  hasTitleError : boolean
  loadTodoError : boolean
  addTodoError : boolean
  deleteTodoError: boolean
  hideErrors : () => void
  setInputRefTarget : React.Dispatch<React.SetStateAction<HTMLInputElement | null>>;
  inputRefTarget : HTMLInputElement | null

}



export const TodoHeader: React.FC<TodoHeaderProps>= ({setHasTitleError , setTodos , setAddTodoError , resetError , setTempTodo , setIsLoading , isLoading , hasTitleError , loadTodoError , addTodoError , deleteTodoError , hideErrors , setInputRefTarget , inputRefTarget}) =>{
  const [title ,setTitle ] = useState('')


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const format_title = title.trim()
    event.preventDefault();
    if (!format_title) {
      setHasTitleError(true);
      resetError()
      return;
    }
    hideErrors()

    addPost()

  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      setInputRefTarget(inputRef.current);
      inputRef.current.focus();
    }
  }, []);


  useEffect(() => {
    inputRefTarget?.focus();
  }, [title, hasTitleError , loadTodoError , addTodoError , deleteTodoError]);

  const addPost = () => {
    const formattedTitle = title.trim();


    const newTempTodo = {
      id: 0,
      title,
      userId: USER_ID,
      completed: false
    };
    setTempTodo(newTempTodo)
    setIsLoading(true);

    const newTodo: Omit<Todo, 'id'> = {
      title: formattedTitle,
      userId: USER_ID,
      completed: false,
    };


    createTodo(newTodo)
      .then((createdTodo) => {
        setTodos((currentTodos) => [...currentTodos, createdTodo]);
        setTitle('');
        inputRefTarget?.focus();
      })
      .catch((error) => {
        setAddTodoError(true)
        resetError()
        inputRefTarget?.focus();
        throw error;
      }).finally(()=>{
        setIsLoading(false)
        setTempTodo(null)
    })
  };


  // deleteTodos(USER_ID).then(
  //
  // )

  // function deletePost(postId: number) {
  //   setPost(currentPosts => currentPosts.filter(post => post.id !== postId));
  //   return deletePostApi(postId)
  //     .catch(error => {
  //       setPost(post);
  //       console.log("Can't delete a post");
  //       throw error;
  //     });
  // }





  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}
            onReset={() => setTitle('')}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
          ref={inputRef}
          disabled={isLoading}
        />
      </form>
    </header>
  )
}
