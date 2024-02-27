import React from 'react'
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Update = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(0)
    const [error, seterror] = useState()
    const {id} = useParams();
    const navigate = useNavigate();

    const getSingleUser = async () => {
      try {
        const response = await fetch(`http://localhost:2200/${id}`);
        const result = await response.json();
        if (!response.ok) {
          console.log(result.error);
          seterror(result.error);
        }
        if (response.ok) {
          seterror('');
          console.log('updated', result);
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
        seterror(error.message);
      }
    };
  // send updated data 
  const handleUpate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, age };
      const response = await fetch(`http://localhost:2200/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      console.log(result);
      seterror('');
      navigate('/All');
    } catch (error) {
      console.error('Failed to update user:', error.message);
      seterror(error.message);
    }
  };
  

  useEffect(() => {
   getSingleUser();
  }, [])
  

  

  return (
    <>
      
      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleUpate}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  )
  }

export default Update