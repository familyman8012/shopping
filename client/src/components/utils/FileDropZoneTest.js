import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

function FileDropZoneTest() {
    const [UploadElement, setUploadElement] = useState([]);
    const FileDropHandler = (files) => {
         /* 파일 업로드시 기본 정보 */     
        let formData = new FormData();
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
         /* 파일하나씩 추가 되는 기본 구문. */   
        formData.append("file", files[0])
        axios.post('/api/testupload/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    setUploadElement([...UploadElement, response.data.filePath]);
                    console.log(response.data);
                } else {
                    alert('업로드에 이상이 생겼습니다.')
                }
            })
    }
    return (
        <div>
            <Dropzone onDrop={FileDropHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div style={{width:300, height:300, border:'1px solid'}} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <div style={{display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                    {UploadElement.map((image, index) => ( 
                        <div key={index}>
                            <img style={{minWidth:'300px', width:'300px', height:'240px'}} src={`http://localhost:5000/${image}`} />
                        </div> 
                    ))}
                </div>
                </section>
            )}
            </Dropzone>
        </div>
    )
}

export default FileDropZoneTest
