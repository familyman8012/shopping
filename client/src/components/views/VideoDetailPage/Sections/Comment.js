import React, {useState} from 'react'

function Comment() {
    const [commentValue, setcommentValue] = useState("")
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value);
    }
    const onSubmit = () => {
        
    }
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />
            {/*Comment List */}

             {/* Root Comment Form */}
             <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', boderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요." 
                />
                <br />
                <button style={{ width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
             </form>

        </div>
    )
}

export default Comment
