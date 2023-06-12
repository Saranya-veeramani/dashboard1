import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/contextProvider';

const Create = () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        title: "",
        description: "",
        genre: "",
        casts: "", 
        imdbrating: "", 
        imdbid: "",

       
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { title, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [title]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { title,description,genre,casts,imdbrating,imdbid} = inpval;

        const res = await fetch("http://localhost:8003/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,description,genre,casts,imdbrating,imdbid  
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate.push("/")
            setUdata(data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Title</label>
                        <input type="text" value={inpval.title} onChange={setdata} name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <input type="email" value={inpval.description} onChange={setdata} name="description" class="form-control" id="exampleInputPassword1" />
                    </div>
                   
                                            
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Genre</label>
                        <input type="number" value={inpval.genre} onChange={setdata} name="genre" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Casts</label>
                        <input type="text" value={inpval.casts} onChange={setdata} name="casts" class="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div class="mb-3 col-lg-6 col-md-6 col-12">
                                            <label for="exampleInputPassword1" class="form-label">Imbdrating</label>
                                            
                        <input type="text" value={inpval.imdbid} onChange={setdata} name="imbdrating" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3 col-lg-6 col-md-6 col-12">
                                            <label for="exampleInputPassword1" class="form-label">Imbd.id</label>
                                            
                        <input type="number" value={inpval.imdbid} onChange={setdata} name="imbdid" class="form-control" id="exampleInputPassword1" />
                        </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Create;