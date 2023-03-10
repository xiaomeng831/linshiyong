### 1.区别1：向路由组件传递参数

```
处理可以通过props使用原先class的三种传参方式外，还可以使用useParams进行params参数的传递：
        路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
        注册路由(声明接收)：不用使用component={Detail}的写法，直接用Route包裹Detail
            <Route path="/home/message/detail/:id/:title"><Detail /></Route>            
        接收参数：使用useParams()，解构赋值得到参数
            const {id,title} = useParams()
```

### 2.区别2：编程式路由导航和withRouter

```jsx
//处理通过props使用history和location的API外，还可以通过useHistory()和useLocation()来使用

const LOCATION = useLocation()
console.log(LOCATION===props.location)

const HISTORY = useHistory()
console.log(HISTORY===props.history)

```

### 3.区别3：补充内容

需求：网页的Header只会在登录页显示，登录完成后不需要显示

hooks中可以使用useRouteMatch

```jsx
const Home = () => {
  return (
    <div>Home</div>
  )
}
// Header组件只会在匹配`/detail/:id`时出现
const Header = () => {
  // 只有当前路径匹配`/detail/:id`时，match不为null
  const match = useRouteMatch('/detail/:id')
  return (
    match && <div>Header</div>
  )
}
const Detail = () => {
  return (
    <div>Detail</div>
  )
}
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/detail/:id" component={Detail}/> 
        </Switch>
      </Router>
    </div>
  );
}

```

