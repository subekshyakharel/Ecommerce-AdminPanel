import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { updateOrderApi } from '../../features/order/orderApi';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { updateOrder } from '../../features/order/orderSlice';
import { useDispatch } from 'react-redux';
import { setmodalShow } from '../../features/system/systemSlice';

const EditOrderform = ({id}) => {
  const {form, handleOnChange} = useForm({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async(e)=>{
    e.preventDefault();

    const {status, message, payload} = await updateOrderApi(id, form);
    console.log(status, message)

    if(status === "success"){
      dispatch(updateOrder(payload)) 
      dispatch(setmodalShow(false))
    }
  }
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
         <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select name='status' value={form.status} onChange={handleOnChange}>
          <option>--- Select Status ---</option>
      <option  value="pending">Pending</option>
      <option value="delivered">Delivered</option>
      <option value="shipped">Shipped</option>
      <option value="processing">Processing</option>
    </Form.Select>
      </Form.Group>

<div className='d-grid'>
      <Button type='submit' variant='dark'>Submit</Button>
      </div>
      </Form>
    </div>
  )
}

export default EditOrderform