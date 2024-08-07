import './App.css'
import { useState } from 'react'
import { BodyContent, CustomActionDropdown, Modal ,FooterContent, Button} from 'vns-lib'
function App() {



  const [dvalue, setDvalue] = useState()
  const [options, setOptions] = useState([
    { id: '1', value: 'value1', label: 'Option 1', isActive: true, age: 12 },
    { id: '2', value: 'value2', label: 'Option 2', isActive: false, age: 15 },
    { id: '3', value: 'value3', label: 'Option 3', isActive: true, age: 18 },

  ])
  const handleChange = (value) => {
    setDvalue(value)
  };
  const onhandleDelete = (id) => {
    let deletOption = options.filter((data) => String(data.id) !== String( id))
    setOptions(deletOption)
  };
  const onhandleAdd = (value) => {
    try {
      setOptions((prev)=>[...prev,value])
      return true
    } catch (error) {
      console.log("error=>",error)
    }
  };
  const onhandleUpdate = (value) => {
    try {
      let deletOption = options.map((data) => data.id === value.id ? value : data)
      setOptions(deletOption)
      return true
    } catch (error) {
      console.log("error=>",error)
    }
  };




  return (
    <>
   
      <Modal open={true} >
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
          {
            id: "id",
            type: "string",
            label: "ID"
          },
          {
            id: "value",
            type: "string",
            label: "Value"
          },
          {
            id: "label",
            type: "string",
            label: "Label"
          },
          {
            id: "age",
            type: "number",
            label: "Age"
          },
          {
            id: "isActive",
            type: "boolean",
            label: "Active"
          },
        ]}
        useFieldAs={{ id: "id", label: "label" }}
        label="Select an option"
        placeholder="Select option"
      />
      
      </BodyContent> 
      <FooterContent>
        <Button>
          Submit
        </Button>
      </FooterContent>
      </Modal>
    </>
  )
}

export default App
