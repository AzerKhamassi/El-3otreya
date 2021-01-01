import React from 'react';
import NewProduct from 'components/Products/NewProduct/NewProduct';
import { Container, Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import classes from './AdminProducts.module.css';
import { AppContext } from 'context/AppContext';
import axios from '../../../axios';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 50 },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 210,
    align: 'center',
  },
];

// function createData(name, price, actions) {
//   return { name, price, actions };
// }

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
const AdminProducts = (props) => {
  const [modal, setModal] = React.useState(false);
  const classesTable = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [productAdded, setProductAdded] = React.useState(false);
  const { darkMode, token } = React.useContext(AppContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    setProductAdded(false);
    axios
      .get('/products/byuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRows(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, [productAdded]);
  const deleteProductHandler = (product) => {
    const originalProdcuts = [...rows];
    const updatedProducts = [...rows];
    const productIndex = rows.findIndex((p) => p._id === product._id);
    updatedProducts.splice(productIndex, 1);
    const token = localStorage.getItem('token');
    axios
      .delete('/products/' + product._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRows(updatedProducts);
      })
      .catch((error) => {
        setRows(originalProdcuts);
      });
  };
  const editProduct = (product) => {
    props.history.push('/products/' + product._id);
  };
  const toggleProductVisibilityHandler = (product) => {
    const originalProdcuts = [...rows];
    const updatedProducts = [...rows];
    const productIndex = rows.findIndex((p) => p._id === product._id);
    updatedProducts[productIndex].visibility = !updatedProducts[productIndex]
      .visibility;
    axios
      .patch(
        '/products/' + product._id,
        [
          {
            propName: 'visibility',
            value: updatedProducts[productIndex].visibility,
          },
        ],
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        setRows(updatedProducts);
      })
      .catch((error) => {
        console.log(error);
        setRows(originalProdcuts);
        // swal('An Error Occured try again', '', 'error');
      });
  };
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
            <NewProduct
              productAdded={setProductAdded}
              modal={modal}
              setModal={setModal}
            />
            <Paper className={classesTable.root}>
              <TableContainer className={classesTable.container}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: darkMode
                              ? 'white'
                              : 'rgb(28, 30, 33)',
                            color: darkMode ? 'black' : 'white',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role='checkbox'
                            tabIndex={-1}
                            key={row._id}
                            style={{
                              backgroundColor: darkMode
                                ? 'white'
                                : 'rgb(28, 30, 33)',
                            }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    color: darkMode ? 'black' : 'white',
                                  }}
                                >
                                  {column.id === 'actions' && (
                                    <React.Fragment>
                                      <Button
                                        className={
                                          classes.BtnEdit + ' fa fa-edit'
                                        }
                                        style={{
                                          color: darkMode ? 'black' : 'white',
                                        }}
                                        onClick={() => editProduct(row)}
                                      ></Button>
                                      <Button
                                        className={
                                          classes.BtnDelete + ' fa fa-times'
                                        }
                                        style={{
                                          color: darkMode ? 'black' : 'white',
                                        }}
                                        onClick={() =>
                                          deleteProductHandler(row)
                                        }
                                      ></Button>
                                      <Button
                                        className={
                                          (row.visibility
                                            ? 'fa fa-eye-slash '
                                            : 'fa fa-eye ') + classes.BtnHide
                                        }
                                        style={{
                                          color: darkMode ? 'black' : 'white',
                                        }}
                                        onClick={() =>
                                          toggleProductVisibilityHandler(row)
                                        }
                                      ></Button>
                                    </React.Fragment>
                                  )}
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                style={{
                  backgroundColor: darkMode ? 'white' : 'rgb(28, 30, 33)',
                  color: darkMode ? 'black' : 'white',
                }}
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default AdminProducts;
