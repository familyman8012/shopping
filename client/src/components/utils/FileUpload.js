import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd'
import axios from 'axios'
import Item from 'antd/lib/list/Item'

function FileUpload() {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {   
        /* 파일 업로드시 기본 정보 */     
        let formData = new FormData();
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }

        /* 파일하나씩 추가 되는 기본 구문. */   
        formData.append("file", files[0])

        /* 서버에 통신 */   
        axios.post('/api/product/image', formData, config)
            .then(response=>{
                if (response.data.success) {
                    console.log(response.data);
                    setImages([...Images, response.data.filePath ])
                } else {
                    alert('이미지 업로드 오류')
                }
            })
    }

    return (
        <div style={{ display:'flex', justifyContent:'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div 
                        style={{display:'flex', width:300, height:240, border:'1px solid lightgray', alignItems:'center', justifyContent:'center'}}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize:'3rem'}} />
                    </div>
                )}
                </Dropzone>
                <div style={{display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                    {Images.map((image, index) => ( 
                        <div key={index}>
                            <img style={{minWidth:'300px', width:'300px', height:'240px'}} src={`http://localhost:5000/${image}`} />
                        </div> 
                    ))}
                </div>
        </div>
    )
}

export default FileUpload
