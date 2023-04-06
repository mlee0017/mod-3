import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createCommentForMemo, deleteCommentFromMemo } from "../../services/commentService"
import { deleteMemo, getMemo } from "../../services/memoService"

function Show({ user }) {
    const [memo, setMemo] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    const detailsRef = useRef()
    useEffect(() => {
        async function loadData() {
            const data = await getMemo(params.id)
            if (!data) navigate('/memo')
            setMemo(data)
        }
        loadData()
    }, [params.id])
    async function handleDeleteComment(comment) {
        await deleteCommentFromMemo(comment._id, memo._id)
        let updatedMemo = { ...memo }
        updatedMemo.comments = updatedMemo.comments.filter(c => c._id !== comment._id)
        setMemo(updatedMemo)
    }
    async function handleDeleteMemo() {
        await deleteMemo(memo._id)
        navigate('/memo')
    }
    async function handleSubmit(e) {
        e.preventDefault()
        let comment = {
            body: bodyRef.current.value,
            user
        }
        const newComment = await createCommentForMemo(comment, memo._id)
        let updatedMemo = { ...memo }
        updatedMemo.comments.push(newComment)
        setMemo(updatedMemo)
        bodyRef.current.value = ''
        detailsRef.current.open = false
    }
    return (
            <div>
                <div className="a-memo">
                    <h2>{memo.mood}</h2>
                    <h2 style={{ opacity: '.3'}}>{memo.user} on {new Date(memo.createdAt).toLocaleDateString()} at {new Date(memo.createdAt).toLocaleTimeString()}</h2>
                    <div className='p-body'>{memo.body}</div><br /><br />

                    {
                        memo.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{memo.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.body}</div>
                                    {comment.user === user &&
                                        <>
                                            <button onClick={() => handleDeleteComment(comment)}>X</button>
                                            <Link to={`/memo/${memo._id}/comments/${comment._id}`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user && 
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button>Comment</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {memo.user === user &&
                            <>
                                <button onClick={handleDeleteMemo}>Delete</button>
                                <Link to={`/memo/${memo._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/memo'>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show