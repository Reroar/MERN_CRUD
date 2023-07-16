import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleclose}><MdClose/></div>
            <div class="mb-3">
              <label htmlFor="companyName" class="form-label">Company Name : </label>
              <input type="text" class="form-control" id="companyName" name="companyName" onChange={handleOnChange} value={rest.companyName}/>
              </div>

              <div class="mb-3"><label htmlFor="status" class="form-label">Status : </label>
              <input type="text" class="form-control" id="status" name="status" onChange={handleOnChange} value={rest.status}/>
              </div>

              <div class="mb-3"><label htmlFor="partName" class="form-label">Part Name : </label>
              <input type="text" class="form-control" id="partName" name="partName" onChange={handleOnChange} value={rest.partName}/>
              </div>

              <div class="mb-3"><label htmlFor="amount" class="form-label">Amount : </label>
              <input type="number" class="form-control" id="amount" name="amount" onChange={handleOnChange} value={rest.amount}/></div>

              <button className="btn" class="btn btn-primary" >Submit</button>
            </form>
    </div>
  )
}

export default Formtable