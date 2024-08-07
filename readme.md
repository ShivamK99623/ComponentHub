# ComponentHub

ComponentHub is a versatile React component library designed to provide developers with a robust set of tools to build modern web applications effortlessly. With an extensive collection of customizable UI components, ComponentHub aims to simplify the development process and ensure a cohesive user experience.

## Key Features

- **Pagination**: Efficiently navigate large datasets with a fully customizable pagination component.
- **Dropdown**: Implement dynamic and responsive dropdown menus with advanced configuration options.
- **Button**: Access a variety of button styles and functionalities to create engaging user interfaces.
- **Modal**: Integrate elegant and flexible modal dialogs for alerts, confirmations, and custom content.
- **Tooltip**: Enhance user interactions with informative tooltips that provide additional context and information.
- **Modular Design**: Import only the components you need, keeping your application lightweight and efficient.
- **Customizable**: Easily tailor each component to match your design system and application requirements.
- **TypeScript Support**: Leverage TypeScript for type-safe development and enhanced code quality.
- **Responsive**: Ensure your UI looks great on all devices with built-in responsive design features.
- **Active Maintenance**: Benefit from regular updates and new component additions based on community feedback and needs.

## Installation

To install ComponentHub, run:

```bash
npm install react-component-hub


import React, { useState } from 'react';
import { BodyContent, CustomActionDropdown, Modal, FooterContent, Button } from 'react-component-hub';
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
    <BodyContent>
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
        label="Select an option"
        placeholder="Select option"
      />
    </BodyContent>
  );
}

export default App;
