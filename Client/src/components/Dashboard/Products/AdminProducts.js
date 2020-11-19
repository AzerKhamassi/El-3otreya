import NewProduct from 'components/Products/NewProduct/NewProduct';
import React from 'react';
import { Container } from 'reactstrap';
import { Button } from 'reactstrap';
import classes from './AdminProducts.module.css';
const AdminProducts = (props) => {
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Container>
        <div className={classes.Content}>
          <div className='text-center'>
            <Button
              color='success'
              className='btn-round'
              onClick={() => setModal(true)}
            >
              Add Product
            </Button>
            <NewProduct modal={modal} setModal={setModal} />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default AdminProducts;
