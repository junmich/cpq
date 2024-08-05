import React from 'react';
import PropTypes from 'prop-types';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  companyInfo: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    borderCollapse: 'collapse',
  },
  tableRow: {
    display: 'table-row',
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  total: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
  },
});

// Create Document Component
export const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Quotation</Text>
        <Text style={{ fontSize: 14 }}>Date: {data.date}</Text>
      </View>

      {/* Recipient Information */}
      <View style={styles.companyInfo}>
        <Text style={styles.sectionTitle}>Recipient Information</Text>
        {/* <Text>Name: {data.recipient.name}</Text> */}
        <Text>Name/Company: {data.recipient.name}</Text>
        <Text>Address: {data.recipient.address}</Text>
        <Text>Contact Info: {data.recipient.contact_info}</Text>
        {/* <Text>Email: {data.recipient.email}</Text> */}
      </View>

      {/* Quotation Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quotation Details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Quantity</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Unit Price</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Total</Text>
            </View>
          </View>
          {data.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}>
                <Text>{item.description}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>${item.unitPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.total}>Discount Total: ${data.total_discount.toFixed(2)}</Text>
        <Text style={styles.total}>Gross Amount: ${(parseFloat(data.total) + parseFloat(data.total_discount)).toFixed(2)}</Text>
        <Text style={styles.total}>Grand Total: ${data.total.toFixed(2)}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for considering our services. If you have any questions, please do not hesitate to contact us.</Text>
      </View>
    </Page>
  </Document>
);

PDFDocument.propTypes = {
  data: PropTypes.
  shape({
    date: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      contact_info: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unitPrice: PropTypes.number.isRequired,
    })).isRequired,
    total: PropTypes.number.isRequired,
    total_discount: PropTypes.number.isRequired,
  }).isRequired,
};