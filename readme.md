# ComponentHub

ComponentHub is a versatile React component library designed to provide developers with a robust set of tools to build modern web applications effortlessly. With an extensive collection of customizable UI components, ComponentHub aims to simplify the development process and ensure a cohesive user experience.

## Key Features

<!-- - **Pagination**: Efficiently navigate large datasets with a fully customizable pagination component. -->
- **Dropdown**: Implement dynamic and responsive dropdown menus with advanced configuration options.
- **Button**: Access a variety of button styles and functionalities to create engaging user interfaces.
- **Modal**: Integrate elegant and flexible modal dialogs for alerts, confirmations, and custom content.
<!-- - **Tooltip**: Enhance user interactions with informative tooltips that provide additional context and information. -->
- **Modular Design**: Import only the components you need, keeping your application lightweight and efficient.
<!-- - **Customizable**: Easily tailor each component to match your design system and application requirements. -->
- **TypeScript Support**: Leverage TypeScript for type-safe development and enhanced code quality.
- **Responsive**: Ensure your UI looks great on all devices with built-in responsive design features.
<!-- - **Active Maintenance**: Benefit from regular updates and new component additions based on community feedback and needs. -->

## Installation and Demo

To install ComponentHub, run:

```bash
import React, { useState } from 'react';
import { CustomActionDropdown } from 'react-component-hub';
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
  );
}

export default App;
```

## ScreenShot 

<p align="center">
![1](https://github.com/user-attachments/assets/2787d320-ea00-45e3-b438-aaccfe2143c2)
![2](https://github.com/user-attachments/assets/dfc5c06b-8a4c-4aee-9dfe-9e4e06f49496)
</p>  


<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/https://in.linkedin.com/in/shivam-kumar-react" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://in.linkedin.com/in/shivam-kumar-react" height="30" width="40" /></a>
</p>





<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>