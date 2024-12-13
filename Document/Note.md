![image-20240422112258414](Note.assets/state_vs_props.png)



![Thinking_In_React](Note.assets/Thinking_In_React.png)



![State_When_And_Where](Note.assets/State_When_And_Where.png)



![image-20240424114409082](Note.assets/Child-To-Parent_Communication.png)



![Component_Composition](Note.assets/Component_Composition.png)



### Components, Instances and Elements

![Component_Instance_Element_01](Note.assets/Component_Instance_Element_01.png)

![Component_Instance_Element_02](Note.assets/Component_Instance_Element_02.png)

![Component_Instance_Element_03](Note.assets/Component_Instance_Element_03.png)

![Component_Instance_Element_04](Note.assets/Component_Instance_Element_04.png)



### How Rendering Works

![How_Rendering_Works_01](Note.assets/How_Rendering_Works_01.png)

#### 1. Overview

**How Renders Are Triggered**

![How_Renders_Are_Triggered_01](Note.assets/How_Renders_Are_Triggered_01.png)

**Virtual DOM**

![Virtual_DOM](Note.assets/Virtual_DOM.png)

* Rendering a component will cause all of its child components to be rendered as well (in Virtual DOM)

##### State Update Batching

* setState 的 state 更新并不是立即执行的，同一位置的多个 setState 只产生一个 component re-render

  * Render Phase 中，state 的更新会存在 Fiber Tree 中，此时重绘并未发生，state 仍是原来的值
  * 如果需要基于上一次更新的值再次更新 state，可以在 setState 的 callback function 中获取上一次更新后的值

  ```jsx
  setTitle((title) => title + 'Hello')
  ```

* React17 及以前在 timeout, promise, DOM 原生事件中调用 setState 并不会自动 batching，即每个 set 操作触发一次 render

![State_Update_Batching](Note.assets/State_Update_Batching.png)



#### 2. The Render Phase

##### Overview

![The_Render_Phase](Note.assets/The_Render_Phase.png)

##### Reconciliation 协调算法

![What_Is_Reconciliation](Note.assets/What_Is_Reconciliation.png)

##### Fiber

![What_Fiber_Is](Note.assets/What_Fiber_Is.png)

![Reconciliation_In_Action](Note.assets/Reconciliation_In_Action.png)

##### Diffing

* 情况一：相同位置，不同组件类型(component type)
  * 旧的组件及其子组件全部移除(即使子组件没有变化)，包括 state

![How_Diffing_Works_01](Note.assets/How_Diffing_Works_01.png)

* 情况二：相同位置，组件类型(component type)不变，但是组件中的属性变化
  * 当前组件及 state 保留，并向其传入新的 props 或 属性
  * 如果希望创建新的组件及 state，需要通过更改 **key prop** 的值

![How_Diffing_Works_02](Note.assets/How_Diffing_Works_02.png)

##### Key Prop

![Key_Prop_01](Note.assets/Key_Prop_01.png)

##### Side Effect And Pure Function

* side effect 不能发生在 render logic，但是可以通过 event handler 或者 effects (useEffect) 触发

![Pure_Function](Note.assets/Pure_Function.png)

##### Rules For Render Logic

* 不要在 Render logic 中更新 state，因为会导致 re-render 的发生再次触发更新 state 操作，造成死循环

![Rules_For_Render_Logic](Note.assets/Rules_For_Render_Logic.png)



#### 3. The Commit Phase

* commit phase 是 **同步 (synchronous)** 的

![Commit_Phase_And_Browser_Paint_01](Note.assets/Commit_Phase_And_Browser_Paint_01.png)

* React 不渲染 DOM，只是负责生成需要渲染更新的 DOM List
* 通过 Renderers (ReactDOM等)，向对应平台**提交 (commit)** Render Phase 的结果

![Commit_Phase_And_Browser_Paint_02](Note.assets/Commit_Phase_And_Browser_Paint_02.png)

#### 4. Summary

![How_Rendering_Works_Recap](Note.assets/How_Rendering_Works_Recap.png)



### How Effect Works

#### Event Delegation

* 事件委派：父组件中绑定事件监听，并通过 e.target 确定触发事件的子组件（利用事件冒泡阶段会触发父子组件中的相同事件的特性）

![image-20240506095316790](Note.assets/Event_Delegation.png)

#### React Handles Events

* React 将所有事件 handler 注册在 root DOM 中 (`#root`)，相当于事件委托
* 注意：React 的事件委派描述的是 **DOM Tree** 而不是 Component Tree，**Component Tree 中的子组件不一定是 DOM Tree 中的子元素**

![image-20240506101505667](Note.assets/Synthetic_Events.png)



### React Libraries

![image-20240506173740808](Note.assets/React_Libraries.png)



### React Frameworks

* Next.js, Remix, Gatsby



### Effects

#### Component Instance Lifecycle

![image-20240507103713469](Note.assets/Component_Instance_Lifecycle.png)



#### Event Handlers VS. Effects

**Event Handler**

* 创建 side effect 的推荐方法

**Effect**

* 在 component mount 后 (inital render) 和 re-render 之后 (基于依赖数组)
* useEffect 可以返回一个 cleanup 函数，在 effect 重新执行之前， unmounted 之后立刻执行

```jsx
useEffect(function() {
    // 执行代码
    
    return Cleanup函数
}, 依赖数组)
```



#### UseEffect Dependency Array

![image-20240507154306265](Note.assets/UseEffect_Dependency_Array.png)

* effect 的同步与当前 useEffect 在 component instance 生命周期中触发阶段的关系

![image-20240507160851283](Note.assets/Synchronization_And_Lifecycle.png)

* UseEffect Dependency Array Rules

![image-20240725165627605](Note.assets/useEffect_Dependency_Array_Rules.png)



#### When Are Effects Executed

![image-20240508115113579](Note.assets/When_Are_Effects_Executed.png)



#### The Cleanup Function

* 在 effect 重新执行之前执行
* 在 component unmounted 之后执行

![image-20240509094149557](Note.assets/The_Cleanup_Function.png)



### React Hooks

React hooks are special built-in functions that allow to **hook into React internals**

* Creating and accessing **state** from Fiber tree
* Registering **side effects** in Fiber tree
* Manual **DOM selections**
* ...

#### Rules of Hooks

![image-20240509152506312](Note.assets/The_Rules_of_Hooks.png)

#### useState Summary

* 更新 object 或 array 类型的 state 时，采用直接替换的方法，确保 set 方法为纯函数

![image-20240513232026317](Note.assets/Summary_Of_Defining_And_Updating_State.png)

#### State VS. REFS

* refs 的更新不会触发 re-render
* refs 是可变更的
* refs 的更新是同步的

![image-20240513233823121](Note.assets/State_VS_Refs.png)

#### Logic With Custom Hook

* function 名称需要以 use 开头
* 内部需要至少使用一个 React Hook

![image-20240514212633905](Note.assets/Logic_With_Custom_Hook.png)



### useReducer

![image-20240625001338674](Note.assets/Managing_State_With_UseReducer.png)

#### useState vs. useReducer

![image-20240630172149869](Note.assets/UseState_VS_UseReducer.png)



### Styling Options in React

![image-20240702001219431](Note.assets/Styling_Options_In_React.png)



### State Management Options in React

![image-20240705150746019](Note.assets/State_Placement_Options.png)



#### context example

```jsx
import { createContext, useContext, useState } from 'react';

const DetailContext = createContext();

function DetailProvider({ children }) {
    const [param1, setParam1] = useState('')
    
    function fn() { console.log('Hello World') }
    
    return (
    	<DetailContext.Provider value={{param1, fn}}>
            { children }
        </DetailContext.Provider>
    )
}

function useDetail() {
    const context = useContext(DetailContext)
    if (!context) throw new Error("DetailContext was used outside DetailProvider")
    return context
}

export { DetailProvider, useDetail }
```



### Performance Optimization

#### memo

![image-20240725140616913](Note.assets/memo_function.png)



#### useMemo and useCallback

useMemo: memorize the result

useCallback: memorize the function

![image-20240725140430987](Note.assets/useMemo_and_useCallback.png)



### Redux

redux middleware

![image-20240726164601403](Note.assets/Redux_Middleware.png)



### Context API VS. Redux

![image-20240726223902744](Note.assets/Context_API_VS_Redux.png)

#### When to use

![image-20240726224158573](Note.assets/When_To_Use_Context_API_Or_Redux.png)



### React Query

![image-20240811162325881](Note.assets/What_Is_React_query.png)