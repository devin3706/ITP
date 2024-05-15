import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    width: '25%',
    padding: 5,
    border: '1 solid black',
  },
});

const GenerateReport = ({ data, selectedExam }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Result Report</Text>
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>Exam Name: {selectedExam}</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Username</Text>
          <Text style={styles.cell}>Questions Answered</Text>
          <Text style={styles.cell}>Marks</Text>
          <Text style={styles.cell}>Result</Text>
        </View>
        {data.map((result, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{result.username}</Text>
            <Text style={styles.cell}>{result.attempts}</Text>
            <Text style={styles.cell}>{result.points}</Text>
            <Text style={styles.cell}>{result.achieved}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default GenerateReport;