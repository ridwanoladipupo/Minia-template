import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { logoutUser } from "../../store/actions"

//redux
import { useDispatch } from "react-redux"

const Logout = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logoutUser(props.history))
  }, [dispatch, props.history])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default Logout
