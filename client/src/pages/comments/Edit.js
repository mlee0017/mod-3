import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getMemoComment, updateCommentOfIdFromMemo } from '../../services/commentService'

function Edit() {
    const [comment, setComment] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    useEffect(() => {
        getMemoComment(params.cid, params.id).then(data => setComment(data))
    }, [params.id, params.cid])
    async function handleSubmit(e) {
        e.preventDefault()
        let updatedComment = {
            body: bodyRef.current.value
        } 
        await updateCommentOfIdFromMemo(updatedComment, params.cid, params.id)
        navigate(`/memo/${params.id}`)
    }
    return ( 
        <div>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="clr">edit:</label><br />
                    <textarea ref={bodyRef} id="clr" cols="5" rows="5" defaultValue={comment.body} /><br /><br />

                    <button>update</button>
                </form>
                <Link to={`/memo/${params.id}`}>
                    <button>Back</button>
                </Link>
            </div>
        </div>
    );
}

export default Edit;