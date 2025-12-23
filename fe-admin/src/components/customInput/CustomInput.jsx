import { Form } from "react-bootstrap";

const CustomInput = ({ label, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </div>
  );
};

export default CustomInput;
