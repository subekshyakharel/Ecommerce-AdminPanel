import React from 'react'
import { Form } from 'react-bootstrap'

const EditOrderform = () => {
  return (
    <div>
      <Form>
         <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Select aria-label="Default select example">
      <option value="pending">Pending</option>
      <option value="delivered">Delivered</option>
      <option value="processing">Processing</option>
      <option value="3">Three</option>
    </Form.Select>
      </Form.Group>
      </Form>
    </div>
  )
}

export default EditOrderform