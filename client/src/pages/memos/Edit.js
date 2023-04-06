import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getMemo, updateMemo } from '../../services/memoService'

function Edit() {
    const [memo, setMemo] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    const subjectRef = useRef()
    useEffect(() => {
        getMemo(params.id).then(data => setMemo(data))
    }, [params.id])
    async function handleSubmit(e) {
        e.preventDefault()
        let updatedMemo = {
            subject: subjectRef.current.value,
            body: bodyRef.current.value
        }
        await updateMemo(memo._id, updatedMemo)
        navigate(`/memo/${memo._id}`)
    }
    return ( 
        <div>
            <h1>Edit Memo</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Subject:</label><br />
                    <input type="text" id="nme" ref={subjectRef} defaultValue={memo.subject} /><br /><br />

                    <label htmlFor="clr">Body:</label><br />
                    <textarea ref={bodyRef} id="clr" cols="30" rows="10" defaultValue={memo.body} /><br /><br />

                    <button>Submit</button>
                </form>
                <Link to={`/memo/${memo._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;