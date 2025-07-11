import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectItem } from '../ui/select'
import { SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

const CommonForm = ({formControldata,formData,setFormData, onSubmit,buttonText,currentId,isBtnDisabled}) => {
  const renderComponentByType =(getControlItem)=>{
    let element = null;
    const value = formData[getControlItem.name]
    switch (getControlItem.componentType) {
      case "input":
        element = ( <div>
          <Input placeholder = {getControlItem.placeholder} name = {getControlItem.name}
          id= {getControlItem.name} type = {getControlItem.type} value = {value} onChange = {(event)=>setFormData({...formData,[getControlItem.name]:event.target.value})}
           />
        </div> )
        break;
      case "textarea":
        element = ( <div>
          <Input placeholder = {getControlItem.placeholder} name = {getControlItem.name}
          id= {getControlItem.name} type = {getControlItem.type} value ={value}
          onChange = {(event)=>setFormData({...formData,[getControlItem.name]:event.target.value})} />
        </div> )
        break;

        case "select":
        
        element = ( 
        <Select value= {value}  onValueChange = {(value)=>setFormData({...formData,[getControlItem.name]:value})} >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder = {getControlItem.label}  />
          </SelectTrigger>
         <SelectContent className='bg-background border' >
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                ))
                : null}
          </SelectContent>
        </Select> )  
        break;
    
      default:
        break;

    }
      return element;

  }
  return (
    <div className='flex flex-col '>
   <form onSubmit={onSubmit} >
      <div className='flex flex-col gap-3 justify-center '>
        {
          formControldata.map((controlItem,index)=>{
            return ( 
            <div key={index}>
              <Label> {controlItem.label} </Label>
              <div className='mt-1'>
                {renderComponentByType(controlItem)}
              </div>
            </div> 
              )
          })
        }
        <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
      </div>
   </form>
    </div>
  )
}

export default CommonForm;
