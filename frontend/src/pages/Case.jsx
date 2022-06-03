import React from 'react'
import { useParams } from 'react-router-dom'

const Case = () => {
  const {caseId} = useParams()
  return (
    <div>Case {caseId}</div>
  )
}

export default Case