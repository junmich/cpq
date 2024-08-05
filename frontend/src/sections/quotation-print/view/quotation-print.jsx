import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import { PDFDocument } from '../../../components/PDFDocument';

export default function QuotationPrintPage() {
  const navigate = useNavigate();
  const handleNavigateBack = () => navigate('/quotation');
  const [quotation, setQuotation] = useState(null);
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

  const getData = () => {
    const data = {
      date: '2024-07-31',
      recipient: {
        name: 'John Doe',
        company: 'XYZ Ltd.',
        address: '456 Client St, Floor 2, Client Town, CT 67890',
        phone: '(987) 654-3210',
        constact_info: '',
      },
      items: [
        {
          description: 'Widget A',
          quantity: 10,
          unitPrice: 25.00,
        },
        {
          description: 'Widget B',
          quantity: 5,
          unitPrice: 40.00,
        },
        {
          description: 'Widget C',
          quantity: 3,
          unitPrice: 75.00,
        },
      ],
      total: 580.00,
    };
    console.log(quotation);

    data.recipient.name = quotation ? quotation.name : '';
    data.recipient.address = quotation ? quotation.address : '';
    data.recipient.contact_info = quotation ? quotation.contact_info : '';
    if (quotation && quotation.quotation_details) {
      data.items = quotation.quotation_details.map((detail) => ({ description: detail.product.name, quantity: detail.quantity, unitPrice: parseFloat(detail.price)}));
    }
    data.total = quotation ? parseFloat(quotation.total_amount) : 0;
    data.total_discount = quotation ? parseFloat(quotation.total_discount) : 0;
    
    return data;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quotation</Typography>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
          <Button onClick={handleNavigateBack} variant="contained" color="error" startIcon={<Iconify icon="eva:save-fill" />}>
            Back
          </Button>
        </Stack>
      </Stack>
      
      <Card>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
            p: 3
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ width: '100%', height: '80vh', border: '1px solid #ccc', padding: '16px' }}>
                  <PDFViewer style={{ width: '100%', height: '100%' }}>
                    <PDFDocument data={getData()} />
                  </PDFViewer>                
              </div>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}
