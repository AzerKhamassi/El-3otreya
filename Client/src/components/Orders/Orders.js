import { AppContext } from 'context/AppContext';
import React from 'react';
import { Col, Table, Button, Row } from 'reactstrap';
import axios from '../../axios';
import Order from './Order/Order';
import classes from './Orders.module.css';
const Orders = (props) => {
  const { darkMode, token } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      document.body.classList.add('sidebar-collapse');
      document.documentElement.classList.remove('nav-open');
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      axios
        .get('/orders/byuser', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data.orders);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      props.history.replace('/login');
    }
    return function cleanup() {
      document.body.classList.remove('sidebar-collapse');
    };
  }, [token, props]);

  return (
    <div style={{ paddingTop: '150px' }}>
      <Row className={classes.Row}>
        <Col className={classes.Image} md='4' xl='3'>
          <img alt='...' src={require('assets/img/undraw_receipt_ecdd.svg')} />
        </Col>
        <Col md='7' xl='8' className={classes.Content}>
          <Table
            className='m-0 p-0'
            responsive
            style={{ color: darkMode ? 'black' : 'white' }}
          >
            <thead>
              <tr>
                <th className='text-center'>Order</th>
                <th className='text-center'>Date</th>
                <th className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className='text-center'>
                    <p className='mt-1' style={{ fontWeight: 'bold' }}>
                      {index + 1}
                    </p>
                  </td>
                  <td className='text-center'>
                    <p className='mt-1' style={{ fontWeight: 'bold' }}>
                      {order.date}
                    </p>
                  </td>
                  <td className='text-center'>
                    <Button
                      className='btn-round m-0'
                      color='info'
                      onClick={() => {
                        setModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Order order={selectedOrder} modal={modal} setModal={setModal} />
    </div>
  );
};

export default Orders;
