import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm.js";
import CustomInput from "../components/customInput/CustomInput.jsx";
import { loginInput } from "../components/input/loginInput.js";
import { loginAdminApi } from "../services/authapi.js";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { autoLoginAdmin, fetchAdminAction } from "../features/admin/adminAction.js";

const initialState = {
  email:"",
  password:"",
}

const Login = () => {
  const {form, setForm, handleOnChange} = useForm(initialState);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const {admin} = useSelector((state)=> state.adminInfo)
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, setIsPending] = useState(false)

  const goto = location?.state?.from?.pathname || "/admin/dashboard"
  useEffect(()=>{
    admin?._id ? navigate(goto) : dispatch(autoLoginAdmin());
  }, [admin?._id, navigate, goto])

const handleOnSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    return alert("Both input must be provided");
  }

  if (isPending) return; // prevent double click

  setIsPending(true); // button disabled

  try {
    const { status, payload } = await loginAdminApi(form);

    if (status === "success") {
      sessionStorage.setItem("accessJWT", payload.accessJWT);
      localStorage.setItem("refreshJWT", payload.refreshJWT);

      setForm(initialState);
      dispatch(fetchAdminAction());
      navigate(goto);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsPending(false); // 🔓 button enabled ALWAYS
  }
};



  return (
    <div className="main mt-5">
      <Container className="d-flex justify-content-center">
        <Row className="border p-3 rounded align-items-center" style={{width:"400px"}}>
          <Col xs={12} md={12} className="mb-3">
            <Form onSubmit={ handleOnSubmit}>
              <h1 className="text-center mb-4">Login!</h1>
              {loginInput.map((input, i) => (
                <CustomInput value={form[input.name] || ""} onChange={handleOnChange} key={i} {...input} />
              ))}
              <div className="d-grid mt-3">
                <Button variant="dark" disabled={isPending}  type="submit">Login</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
