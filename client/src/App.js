import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080"

function App() {
  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    companyName : "",
    status : "",
    partName : "",
    amount : "",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    companyName : "",
    status : "",
    partName : "",
    amount : "",
    _id : ""
  })

  // console.log(formData);
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }


  const handleSubmit = async(e)=>{
      e.preventDefault()
      const data = await axios.post("/create",formData)
      // console.log(data)
      if(data.data.success){
          setAddSection(false)
          alert(data.data.message)
          getFetchData()
          setFormData({
            companyName : "",
            status : "",
            partName : "",
            amount : "",
          })

      }
      // console.log(formData);
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
        setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
      if(data.data.success){
        getFetchData()
        // alert(data.data.message)
      }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success){
      getFetchData()
      // alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }
  const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
   <>
      <div className="container">
        <button className="btn btn-primary" onClick={()=>setAddSection(true)}>Add</button>

      {
        addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose = {()=>setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }


      <div className='tableContainer'>
        <table class="table table-dark table-hover table-striped reroar rounded">
          <thead className='rounded'>
            <tr className='rounded'>
              <th className='roww bordtl' scope="col">Company Name</th>
              <th className='roww' scope="col">Status</th>
              <th className='roww' scope="col"> Part Name</th>
              <th className='roww' scope="col"> Amount</th>
              <th className='roww bordtr' scope='col'>
              Action
              </th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            { dataList[0] ? (
              dataList.map((el)=>{
                console.log(el) 
                return(
                  
                  <tr >
                    <td className='bord'>{el.companyName}</td>
                    <td className='bord'>{el.status}</td>
                    <td className='bord'>{el.partName}</td>
                    <td className='bord'>{el.amount}</td>
                    <td className='bord'>
                      <button className='btn btn-primary ' onClick={()=>handleEdit(el)}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign : "center"}}>No data</p>
              )
            }
          </tbody>
        </table>
      </div>
     


      </div>
   </>
  );
}

export default App;
