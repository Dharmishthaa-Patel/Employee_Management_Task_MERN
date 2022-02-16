import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get_upload_file, loading_Action, upload_file, delete_file } from '../Action/Action';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from '@material-ui/lab/Pagination'
import { Checkbox } from '@material-ui/core';
toast.configure()

const UploadFile = () => {

    const [fileInput, setfileInput] = useState()
    const [pageNo, setPageNo] = useState(1)

    const dispatch = useDispatch()

    // ========= For display Login User Name ============
    const LoginUser = useSelector(state => state.LoginUser)


    // ========= For get Upload File ========
    const getUploadFiles = useSelector(state => state.getUploadFiles)


    // ========= For Loading =============
    const isLoading = useSelector(state => state.isLoading)


    // ============== For Pagination ===========
    const filePageNo = useSelector(state => state.filePageNo)

    // ============= For Delete File ==============
    const DeleteUser = useSelector(state => state.DeleteUser)

    // =============== Submit =============
    const handleSubmit = (e) => {

        e.preventDefault()
        console.log("multi-File",fileInput)

        if(!fileInput){
            toast.error(" Please Upload File ", { 
                autoClose : 2000
            })
        } else {

             // ==== For Loading status ======
            dispatch(loading_Action())

            const formData = new FormData()
            for (let i = 0 ; i < 5; i++){  
                formData.append('multi-files', fileInput[i])
            }

            dispatch(upload_file(formData))
            e.target.reset()
            setfileInput('')
        }
    }

    useEffect(() => {
        dispatch(get_upload_file(pageNo))
    },[isLoading, fileInput, pageNo, DeleteUser])


    // ============ Input onChange =============
    const handleFileChange = (e) => {
        setfileInput({...fileInput, ...e.target.files})
    }

    // ============== DeleteFile ================
    const handleDelete = (file) => {
        console.log("file",file)

        window.confirm("Are You Sure?")
        dispatch(delete_file(file))
    }

    return (
        <>  
            <div>
                <h4>
                    { LoginUser && (`Sign In  ${LoginUser.name}`) }
                </h4>
                <br />

                <h3> Upload File </h3>
                <br />

                <form onSubmit={handleSubmit}>
                        {
                            isLoading ? (
                                <>
                                <input 
                                    type='file'
                                    name='multi-files'
                                    disabled
                                /> 
                                <br />
                                    <button  disabled 
                                             className='btn btn-dark mt-3'> 
                                                Uploading...
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input 
                                        type='file'
                                        name='multi-files'
                                        multiple
                                        onChange={(e) => handleFileChange(e)}
                                    /> 
                                    <br />
                                    <button type='submit' 
                                            className='btn btn-dark mt-3'> 
                                                Upload 
                                    </button>
                                    <br />
                                </>
                            )
                        }
                </form>

                {/* ========= Loader ======== */}
                    {
                        isLoading ? (
                            <ClipLoader color={'4A90E2'}  loading={isLoading}  size={50} />
                        ) : (
                                null  
                        )
                            
                    }

                    {/* ======= For Get Upload File List ====== */}
                    <br />
                    
                        <div className='item'>
                        <button className='btn btn-secondary mt-3' value='true' aria-checked="true"> 
                            Check All 
                        </button>
                        <br  />
                            {
                                getUploadFiles[0] && getUploadFiles[0].GetFiles.length > 0
                                    && getUploadFiles[0].GetFiles.map((elem) => {
                                    return(
                                        <>
                                            {
                                                elem.filetype === '.txt' ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src='https://www.freeiconspng.com/uploads/txt-file-icon-free-search-download-as-png-ico-and-icns-iconseeker--1.png' 
                                                             alt='TXT' className='img'/>
                                                            <Checkbox /> 
                                                            <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }
                                            
                                            {
                                                elem.filetype === ".doc" ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src='https://cdn4.vectorstock.com/i/1000x1000/62/88/monochrome-round-doc-file-icon-vector-5106288.jpg' 
                                                             alt='DOC' className='img'/> 
                                                            <Checkbox />
                                                            <br />
                                                        <button onClick={() => handleDelete(elem.public_id)} 
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }
                                            
                                            {
                                                elem.filetype === ".docx" ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src='https://cdn4.vectorstock.com/i/1000x1000/62/88/monochrome-round-doc-file-icon-vector-5106288.jpg' 
                                                             alt='DOCX' className='img'/>
                                                            <Checkbox />
                                                            <br />
                                                        <button onClick={() => handleDelete(elem.public_id)} 
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }

                                            {
                                                elem.filetype === ".pdf" ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src='https://icons.iconarchive.com/icons/graphicloads/filetype/128/pdf-icon.png' 
                                                             alt='PDF' className='img'/>
                                                            <Checkbox /> 
                                                            <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }

                                            {
                                                elem.filetype === ".xml" ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src='https://as1.ftcdn.net/v2/jpg/04/46/40/84/1000_F_446408465_aqlGBK2DsZTvhkcDqV6rkaOvvEMtVmau.jpg' 
                                                             alt='XML' className='img'/>
                                                            <Checkbox /> 
                                                            <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }
                                            
                                            {
                                                elem.filetype === ".jpg"  ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src={elem.filepath} alt='jpg' className='img' />
                                                        <Checkbox />
                                                        <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }  
                                            
                                            {
                                                elem.filetype === ".jpeg"  ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src={elem.filepath} alt='jpeg' className='img' />
                                                        <Checkbox />
                                                        <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }     
                                            
                                            {
                                                elem.filetype === ".png"  ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src={elem.filepath} alt='png' className='img' />
                                                        <Checkbox />
                                                        <br />
                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }  
                                        </>
                                    )
                                })
                            }
                        </div>
                        
                        {/* ======== Pagination ========== */}
                        <Pagination
                            count={filePageNo}
                            color='secondary'                            
                            variant='outlined'
                            size='medium'
                            showFirstButton={true}                   
                            onChange={(event, value) => { setPageNo(value) }}
                        />
            </div>
        </>
    )
}

export default UploadFile;