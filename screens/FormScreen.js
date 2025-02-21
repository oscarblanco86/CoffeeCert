// screens/FormScreen.js

import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const soilInfoSchema = Yup.object().shape({
  soilType: Yup.string().required('Soil type is required'),
  pHLevel: Yup.number().required('pH level is required').min(0).max(14),
  moistureLevel: Yup.number().required('Moisture level is required').min(0).max(100),
});

const soilTypes = [
  { label: 'Sandy', value: 'sandy' },
  { label: 'Clay', value: 'clay' },
  { label: 'Silty', value: 'silty' },
  { label: 'Peaty', value: 'peaty' },
  { label: 'Chalky', value: 'chalky' },
  { label: 'Loamy', value: 'loamy' },
];

const FormScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Soil Information Form</Text>
      <Formik
        initialValues={{ soilType: '', pHLevel: '', moistureLevel: '' }}
        validationSchema={soilInfoSchema}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('Chat', { soilInfo: values });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Soil Type</Text>
            <Picker
              selectedValue={values.soilType}
              onValueChange={(itemValue) => setFieldValue('soilType', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select soil type" value="" />
              {soilTypes.map((soilType) => (
                <Picker.Item key={soilType.value} label={soilType.label} value={soilType.value} />
              ))}
            </Picker>
            {touched.soilType && errors.soilType && <Text style={styles.error}>{errors.soilType}</Text>}

            <TextInput
              style={styles.input}
              placeholder="pH Level"
              onChangeText={handleChange('pHLevel')}
              onBlur={handleBlur('pHLevel')}
              value={values.pHLevel}
              keyboardType="numeric"
            />
            {touched.pHLevel && errors.pHLevel && <Text style={styles.error}>{errors.pHLevel}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Moisture Level (%)"
              onChangeText={handleChange('moistureLevel')}
              onBlur={handleBlur('moistureLevel')}
              value={values.moistureLevel}
              keyboardType="numeric"
            />
            {touched.moistureLevel && errors.moistureLevel && <Text style={styles.error}>{errors.moistureLevel}</Text>}

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default FormScreen;