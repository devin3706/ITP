// TeacherDetailsPDF.jsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  chart: {
    width: '45%',
    height: 200,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'solid',
    marginBottom: 5,
  },
  column: {
    width: '16.666666%',
    padding: 5,
    fontSize: 10,
  },
});

// Create PDF component
const TeacherDetailsPDF = ({ teachers, pieChartData, barChartData }) => (
  <Document>
    <Page size="A4">
      <View style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Teacher Details</Text>
          <View>
            {/* Table Header */}
            <View style={[styles.row, { backgroundColor: '#f2f2f2' }]}>
              <Text style={[styles.column, { fontWeight: 'bold', borderRightWidth: 1 }]}>Name</Text>
              <Text style={[styles.column, { fontWeight: 'bold', borderRightWidth: 1 }]}>Subject</Text>
              <Text style={[styles.column, { fontWeight: 'bold', borderRightWidth: 1 }]}>District</Text>
              <Text style={[styles.column, { fontWeight: 'bold', borderRightWidth: 1 }]}>Education Qualification</Text>
              <Text style={[styles.column, { fontWeight: 'bold', borderRightWidth: 1 }]}>Phone Number</Text>
              <Text style={[styles.column, { fontWeight: 'bold' }]}>Email</Text>
            </View>
            {/* Table Body */}
            {teachers.map((teacher, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.column, { borderRightWidth: 1 }]}>{teacher.firstName} {teacher.lastName}</Text>
                <Text style={[styles.column, { borderRightWidth: 1 }]}>{teacher.subject}</Text>
                <Text style={[styles.column, { borderRightWidth: 1 }]}>{teacher.district}</Text>
                <Text style={[styles.column, { borderRightWidth: 1 }]}>{teacher.eduQualification}</Text>
                <Text style={[styles.column, { borderRightWidth: 1 }]}>{teacher.phoneNumber}</Text>
                <Text style={styles.column}>{teacher.email}</Text>
              </View>
            ))}
         
          
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default TeacherDetailsPDF;
