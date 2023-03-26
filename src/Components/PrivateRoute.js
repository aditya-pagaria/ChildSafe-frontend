import { Redirect, Route } from 'react-router'
import { useAuth } from '../Contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUserId } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUserId
          ? <Component {...props} />
          : <Redirect to='/login' />
      }}
    />
  )
}

export default PrivateRoute
