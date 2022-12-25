import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header/Header'
import { useLocation, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import withRouter from './hoc/withRouter'
import withRedux from './hoc/whithRedux'
import routes from './routes'
import { useSelector } from 'react-redux'
import { isAdminSelector, isLoggedInSelector } from './store/authSlice'
import Footer from './components/Footer/Footer'

function App() {
  const isLoggedIn = useSelector(isLoggedInSelector())
  const isAdmin = useSelector(isAdminSelector())
  const location = useLocation()
  const elements = useRoutes(routes(isLoggedIn, location, isAdmin))
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="container">{elements}</div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

const AppWithStoreAndRoutes = withRedux(withRouter(App))

export default AppWithStoreAndRoutes
