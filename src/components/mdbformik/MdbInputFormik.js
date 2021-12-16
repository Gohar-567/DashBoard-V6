import { MDBInput } from 'mdb-react-ui-kit';

const MDBInputFormik = ({ field, form, ...props }) => {
  const { name } = field;

  return (
    <MDBInput
      onChange={(e) => {
        let value = e.target.value;
        form.setFieldValue(name, value);
      }}
      {...props}
      {...field}
    />
  );
};

export default MDBInputFormik;
