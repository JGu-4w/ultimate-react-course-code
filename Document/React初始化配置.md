**Create Project & Install Package**

```bash
npm create vite
npm install
```

**Config ESlint**

```bash
npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

.eslintrc.json

```json
{
    extends: ['react-app']
}
```

vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
```



**React Router**

```bash
npm install react-router-dom
```

App.jsx

```jsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="homepage" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />}>
            <Route index element={<Navigate replace to="item" />} />
            <Route path="item" element={<Item />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

Product.jsx

```jsx
export default function Product() {
    return (
        <div>
    		<Outlet /> <!-- 显示嵌套路由的元素 -->
        </div>
    )
}
```

PageNav.jsx

```jsx
import { NavLink } from 'react-router-dom'

export default function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  )
}
```



**CSS Modules**

PageNav.module.css

```css
.nav {
  background-color: skyblue;
}

.nav ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.nav :global(.active) {
  /* 使用 :global() 选择全局类 */
  background-color: chartreuse;
}
```



**Context API**

包含 Provider, Consumer, 

```jsx
import { createContext, useContext } from 'react'

const MyContext = createContext()
function ParentComponent() {
    return (
    	<MyContext.Provider
          value={{
            params1: params1,
			params2: params2
        }}>
        	<ChildComponent />
        </MyContext.Provider>
    )
}

function ChildComponent() {
    const {param1, param2} = useContext(MyContext)
    return (
        <div>{param1} {param2}</div>
    )
}
```

