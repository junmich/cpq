import axios from 'axios';
import Cookies from 'js-cookie';
import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';

export default function QuotationUpdatePage() {
  const nameInput = useRef(null);
  const addressInput = useRef(null);
  const termsInput = useRef(null);
  const productSearch = useRef(null);
  const navigate = useNavigate();
  const handleNavigateBack = () => navigate('/quotation');
  const [quotation, setQuotation] = useState(null);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalAmount, setTotalAmount] = useState(parseFloat(0));
  const [totalDiscount, setTotalDiscount] = useState(parseFloat(0));

  const parameter = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:3001/api/quotation/header/${parameter.id}`,
      headers: { 
        'Authorization': Cookies.get('token')
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const quotationData = response.data.data[0];
      console.log(quotationData);
      setQuotation(quotationData);
    })
    .catch((error) => {
      console.log(error);
    });
  },[parameter.id]);

  useEffect(() => {
    console.log(quotation);
    if (quotation) {
      nameInput.current.value = quotation ? quotation.name : '';
      addressInput.current.value = quotation ? quotation.address : '';
      termsInput.current.value = quotation ? quotation.terms : '';
      if (quotation.quotation_details) {
        setRows(quotation.quotation_details.map(detail => ({ total: detail.total, id: detail.id, description: detail.product.description, product: detail.product.name, price: detail.price, unit: detail.unit, discount: detail.discount})));
      }

      setTotalAmount(quotation.total_amount);
      setTotalDiscount(quotation.total_discount);
      
    }
    
  },[quotation]);

  useEffect(() => {
    let discount = 0;
    let amount = 0;
  
    rows.forEach(row => {
      // Calculate discount based on quantity, price, and discount
      const rowTotal = (row.quantity || 0) * (row.price || 0);
      const rowDiscount = row.discount || 0;
      discount += rowDiscount;
      amount += rowTotal - rowDiscount;
    });
  
    setTotalDiscount(discount);
    setTotalAmount(amount);
  }, [rows]);

  const handleSaveDetails = (quotationHeaderId) => {
    const items = rows.map(row => {
      const { id, price, unit, discount, quantity, total } = row;
      const newRow = {
        product_id: id,
        price,
        unit,
        discount,
        quantity, 
        total,
        quotation_header_id: quotationHeaderId
      };
      console.log(newRow);
      return newRow;
    });
    console.log(items);
    const data = JSON.stringify({items});
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/quotation/details',
      headers: { 
        'Authorization': Cookies.get('token'),
        'Content-Type': 'application/json'
      },
      data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
  const handleSaveQuotation = () => {
    const token = Cookies.get('token');
    const name = nameInput.current?.value;
    const address = addressInput.current?.value;
    const terms = termsInput.current?.value;

    if (name === '' ||
      address === '' ||
      terms === ''
    ) {
      alert('Please Fill out the required info.');
    } else  {
      console.log(name, address, terms);
    const data = JSON.stringify({
      name,
      address,
      terms,
      total_amount: totalAmount,
      total_discount: totalDiscount
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/quotation/header',
      headers: { 
        'Authorization': token, 
        'Content-Type': 'application/json'
      },
      data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      const quotationHeaderId = response.data.data.id;
      handleSaveDetails(quotationHeaderId);
    })
    .catch((error) => {
      console.log(error);
    });
    }

  }

  const handleRowEditCommit = (params) => {
    console.log(params);
    const updatedRows = rows.map((row) => {
      
      if (row.id === params.id) {
        console.log(row, params, row.id === params.id, params.field, {[params.field]: params.value } );
        const updatedRow = params;
        console.log(updatedRow, 'updatedRow');
        updatedRow.total = (updatedRow.quantity || 0) * (updatedRow.price || 0);
        console.log(updatedRow, 'updatedRow with price');
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, product: '', description: '', quantity: 1, price: 0, discount: 0, total: 0 };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmAdd = () => {
    handleAddRow();
    handleClose();
  };

  const searchColumns = [
    { field: 'id', headerName: 'ID', width: 100, display: false },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    // { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAddRowWithProduct(params.row);
            handleClose();
          }}
        >
          Add
        </Button>
      ),
    },
  ];

  const handleAddRowWithProduct = (product) => {
    const newRow = { id: product.id, product: product.name, description: product.description, unit: product.unit, quantity: 1, price: product.price, discount: 0, total: product.price };
    setRows([...rows, newRow]);
  };

  const columns = [
    { field: 'product', headerName: 'Product', width: 150, editable: false },
    { field: 'description', headerName: 'Description', width: 250, editable: false },
    { field: 'quantity', headerName: 'Quantity', width: 100, editable: true, type: 'number' },
    { field: 'unit', headerName: 'Unit', width: 100, editable: false },
    { field: 'price', headerName: 'Price', width: 100, editable: true, type: 'number' },
    { field: 'discount', headerName: 'Discount', width: 100, editable: true, type: 'number' },
    {
      field: 'total',
      headerName: 'Total',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteRow(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents form submission if inside a form
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3001/api/product/all?name=${productSearch.current?.value}`,
        headers: { 
          'Authorization': Cookies.get('token')
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSearchResults(response.data.data); 
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quotation</Typography>


        <Stack direction="row" alignItems="right" justifyContent="flex-end" spacing={2}>
          <Button onClick={handleNavigateBack} variant="contained" color="error" startIcon={<Iconify icon="eva:save-fill" />}>
            Cancel
          </Button>

          <Button onClick={handleSaveQuotation} variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
            Save
          </Button>
        </Stack>
        
      </Stack>

      <Card>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          p={3}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                inputRef={nameInput}
                id="outlined-multiline-flexible"
                label="Name"
                multiline
                maxRows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                inputRef={termsInput}
                id="outlined-textarea"
                label="Terms"
                placeholder="Terms"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-multiline-static"
                label="Address"
                inputRef={addressInput}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-textarea"
                value={totalDiscount}
                label="Total Discount"
                placeholder="Total Discount"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                value={totalAmount}
                id="outlined-textarea"
                label="Total Amout"
                placeholder="Total Amount"
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box sx={{ height: 400, width: '100%', mt: 5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpen}
          >
            Add Item
          </Button>
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onProcessRowUpdateError={(error) => console.log(error)}
          processRowUpdate={handleRowEditCommit}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type and hit enter.
          </DialogContentText>
          <TextField
                required
                inputRef={productSearch}
                id="outlined-multiline-flexible"
                label="Product Search"
                maxRows={4}
                onKeyDown={handleKeyDown} 
                fullWidth
              />
            <Box sx={{ height: 300, width: '100%', mt: 3 }}>
              <DataGrid
                columnVisibilityModel={{
                  // Hide columns status and traderName, the other columns will remain visible
                  id: false,
                  // traderName: false,
                }}
                rows={searchResults}
                columns={searchColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmAdd} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
