import React, {useState} from 'react';
import axios from 'axios';

function CrudTest() {
    const [Crud, setCrud] = useState([]);
    function save() {
        axios({
            method: 'post',
            url: "/api/crudtest/createDatas",
            data: {
                name: "김하늘",
                job: "배우",
                hobby : "연기"
            }
          }).then(function (response) {
            console.log(response.data);
          })
        .catch(function (error) {
            console.log(error);
        });
    }
    function read() {
        axios({
            method: 'get',
            url: "/api/crudtest/readDatas",
          }).then(function (response) {
            console.log(response.data.cruds);
            setCrud(response.data.cruds);
          })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div>
            <div onClick={save}>저장</div>
            <div onClick={read}>읽기</div>
            {Crud && 
                Crud.map((cruds, index) => 
                    (<div key={cruds.name + index}>
                        <span>{cruds.name}</span>
                        <span>{cruds.job}</span>
                        <span>{cruds.hobby}</span>
                    </div>))
            }
        </div>
    )
}

export default CrudTest
