import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get_upload_file, loading_Action, upload_file, delete_file, delete_multiple_file } from '../Action/Action';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from '@material-ui/lab/Pagination';
import Checkbox from './CheckBox'
toast.configure()

const UploadFile = () => {

    // ============ For Upload File ===========
    const [fileInput, setfileInput] = useState()

    // =========== For Pagination ============
    const [pageNo, setPageNo] = useState(1)
    const [currentPage, setCurrentPage] = useState(5)

    // =========== DeleteMultiple File =========== 
    const [multipleFileDelete, setMultipleFileDelete] = useState([])

    // ========= All Delete File =============
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const dispatch = useDispatch()


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

        console.log("multi-File",fileInput)

        if(!fileInput){
            e.preventDefault()
            toast.error(" Please Upload File ", { 
                autoClose : 2000
            })
        } else {

            e.preventDefault()
             // ==== For Loading status ======
            dispatch(loading_Action())

            const formData = new FormData()
            for (let i = 0 ; i < 10; i++){  
                formData.append('multi-files', fileInput[i])
            }

            dispatch(upload_file(formData))
            e.target.reset()
            setfileInput('')
        }
    }

    useEffect(() => {
        setIsCheckAll(false)
        dispatch(get_upload_file(pageNo,currentPage))
    },[isLoading, fileInput, pageNo, currentPage, DeleteUser,dispatch])


    // ============ Input onChange =============
    const handleFileChange = (e) => {
        setfileInput({...fileInput, ...e.target.files})
    }

    // ============== Single Delete File ================
    const handleDelete = (file) => {

        setMultipleFileDelete([])
        dispatch(loading_Action())

        window.confirm("Are You Sure?")
        dispatch(delete_file(file))
    }

    // ============ Multiple Delete File =============
    const handleMultipleDelete = (e) => {
        
        if(isCheck.length <= 0){
            e.preventDefault()
            toast.error(" Please Select File ", { 
                autoClose : 2000
            })
        } else {
            if(window.confirm("Are You Sure?")){
                e.preventDefault()

                dispatch(loading_Action())
                dispatch(delete_multiple_file(isCheck))
            }
        }
    }
    console.log("isCheckes",currentPage)

    // =========== All Delete CheckBox OnChange =========
    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll)
        console.log("isCheck All", !isCheckAll)

        setIsCheck(getUploadFiles[0] && getUploadFiles[0].GetFiles.length > 0 && getUploadFiles[0].GetFiles.map((li) => li._id))
        if (isCheckAll) {
            setIsCheck([])
        }
    }

    // ========== For Select CheckBox Click ========
    const handleClick = (e) => {
        const { id, checked } = e.target
        setIsCheck([...isCheck, id])
        setIsCheckAll(false)
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id))
        }
    }

    // =========== For Pagination ===========
    const handlePagination = (e) => {
        // console.log("value",e.target.value);
        setCurrentPage(e.target.value)
    }

    return (
        <>  
            <div>

                <h3> Upload File </h3>
                <br />

                <form onSubmit={handleSubmit}>
                        {
                            isLoading ? (
                                // ======== Disable at Loading Time ==========
                                <>
                                    <input type='file' disabled /> <br />
                                    <button  disabled className='btn btn-dark mt-3'> 
                                                Uploading...
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input type='file' name='multi-files' multiple
                                           onChange={(e) => handleFileChange(e)} />  
                                    <br />
                                    <button type='submit' className='btn btn-dark mt-3'> 
                                            Upload 
                                    </button>
                                    <br />
                                </>
                            )
                        }
                        <br />
                </form>

                <select className='dropDown' onClick={(e) => handlePagination(e)} >
                                <option value="5"> 5 </option>
                                <option value="10"> 10 </option>
                                <option value="15"> 15 </option>
                                <option value="20"> 20 </option>
                </select>
                 <br />

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
                            <label> Select All </label>&nbsp;

                            <Checkbox type='checkbox' 
                                      name="selectAll" 
                                      id="selectAll" 
                                      handleClick={handleSelectAll} 
                                      isChecked={isCheckAll}  /><br />
                            {
                                isLoading ? <button className='btn btn-secondary mt-3' disabled > 
                                                        Delete All 
                                                    </button> 
                                            :  <button className='btn btn-secondary mt-3'
                                                   onClick={handleMultipleDelete}> 
                                                        Delete All 
                                                    </button>
                            }
                        <br  /><br  />

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
                                                                      
                                                            <Checkbox
                                                                type='checkbox' 
                                                                key={elem._id} 
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />
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
                                                            <Checkbox 
                                                                type='checkbox' 
                                                                key={elem._id}  
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />         
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
                                                            <Checkbox 
                                                                type='checkbox' 
                                                                key={elem._id}  
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />       
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
                                                            <Checkbox 
                                                                type='checkbox' 
                                                                key={elem._id}  
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />      
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
                                                            <Checkbox 
                                                                type='checkbox' 
                                                                key={elem._id}  
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />      
                                                            <br />

                                                        <button onClick={() => handleDelete(elem.public_id)}
                                                                className='btn btn-small btn-danger'>
                                                                    Delete
                                                        </button>
                                                    </>
                                                ) : null
                                            }
                                            
                                            {
                                                elem.filetype === ".jpg" || elem.filetype === ".jpeg" || elem.filetype === ".png" ? (
                                                    <>
                                                        <h6> {elem.filename} </h6>
                                                        <img src={elem.filepath} alt='jpg' className='img' />
                                                            <Checkbox 
                                                                type='checkbox' 
                                                                key={elem._id}  
                                                                name={elem._id}
                                                                handleClick={handleClick}
                                                                id={elem._id}
                                                                isChecked={isCheck.includes(elem._id)} />
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
                            onChange={(event, value) =>  setPageNo(value) }
                        />
                        
            </div>
        </>
    )
}

export default UploadFile;