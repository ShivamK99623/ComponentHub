import React, { useState } from 'react';
import {CustomActionDropdown, Dropdown } from 'react-component-hub';
import './App.css';

function App() {
  const [dvalue, setDvalue] = useState(null);
  const [options, setOptions] = useState([
    { id: '1', value: 'value1', label: 'Option 1', isActive: true, age: 12 },
    { id: '2', value: 'value2', label: 'Option 2', isActive: false, age: 15 },
    { id: '3', value: 'value3', label: 'Option 3', isActive: true, age: 18 },
  ]);

  const handleChange = (value) => {
    setDvalue(value);
  };

  const onhandleDelete = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  const onhandleAdd = (newOption) => {
    try {
      setOptions((prevOptions) => [...prevOptions, newOption]);
      return true;
    } catch (error) {
      console.error('Error adding option:', error);
      return false;
    }
  };

  const onhandleUpdate = (updatedOption) => {
    try {
      const updatedOptions = options.map((option) =>
        option.id === updatedOption.id ? updatedOption : option
      );
      setOptions(updatedOptions);
      return true;
    } catch (error) {
      console.error('Error updating option:', error);
      return false;
    }
  };

  return (
    <>
      <CustomActionDropdown
        options={options}
        value={dvalue}
        onChange={handleChange}
        onhandleDelete={onhandleDelete}
        onhandleAdd={onhandleAdd}
        onhandleUpdate={onhandleUpdate}
        isClearable
        ObjConfig={[
          { id: 'id', type: 'string', label: 'ID' },
          { id: 'value', type: 'string', label: 'Value' },
          { id: 'label', type: 'string', label: 'Label' },
          { id: 'age', type: 'number', label: 'Age' },
          { id: 'isActive', type: 'boolean', label: 'Active' },
        ]}
        useFieldAs={{ id: 'id', label: 'label' }}
        label="Select and edit option "
        placeholder="Select option"
      />
      <Dropdown
        options={options}
        value={dvalue}
        onChange={handleChange}
        isClearable
        label="Select an option"
        placeholder="Select option"
      />
    </>
  );
}

export default App;
