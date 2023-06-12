import React, { useContext, useState,useEffect } from 'react'
import { NavLink, useNavigate,useParams } from 'react-router-dom'
import { adddata } from './context/contexProvider';

const Edit= () => {

    const { udata, setUdata } = useContext(adddata);

    const navigate= useNavigate();

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

    const { title } = useParams("");
    console.log(title);
    const getdata = async () => {

        const res = await fetch(`http://localhost:8003/view/${title}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updatedata= async(e)=>{
        e.preventDefault();

        const {title,description,genre,casts,imdbrating,imdbid} = inpval;

        const res2 = await fetch(`http://localhost:8003/updatemovie/${title}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
               title,description,genre,casts,imdbrating,imdbid 
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate.push("/")
            setUdata(data2);
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
                        <input type="text" value={inpval.genre} onChange={setdata} name="genre" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Casts</label>
                        <input type="text" value={inpval.casts} onChange={setdata} name="casts" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Imbdrating</label>
                        <input type="text" value={inpval.imdbrating} onChange={setdata} name="imbdrating" class="form-control" id="exampleInputPassword1" />
                    </div><div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Imbd.id</label>
                        <input type="text" value={inpval.imdbid} onChange={setdata} name="imbdid" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" onClick={updatedata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Edit;