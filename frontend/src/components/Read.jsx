import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setdata] = useState();
  const [error , seterror] = useState();
  async function getData (){
    const response = await fetch('http://localhost:2200/')
    const result = await response.json()

    if(!response.ok){
      console.log(result.error)
      seterror(result.error)
    }
    if (response.ok){

      setdata(result)
    }
  }
  useEffect(() => {
    getData();
  }, [])
  console.log(data)

  const deleteBtn = async(id)=>{
     const response = await fetch(`http://localhost:2200/${id}`,{
      method : "DELETE",
     })
     const result = await response.json();
     if(!response.ok){
      console.log(result.error)
      seterror(result.error)
    }
    if (response.ok){

      seterror('deleted successfully')
      setTimeout(() => {
        seterror('');
        getData();

      }, 1000);
    }
  }


  return (
    <>
     {error && <div class="alert alert-danger" >{error}</div>}
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data && data.map((ele) =>(
       <div key={ele._id} className="col-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
            <a href="#" className="card-link" onClick={()=>{deleteBtn(ele._id)}}>
              Delete
            </a>
            <Link to={`/${ele._id}`} className="card-link">
              Edit
            </Link>
          </div>
        </div>
      </div>

        ))}
    </div>
    </>
  );
};

export default Read;
