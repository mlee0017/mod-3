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
                    <h2>me rn</h2>
                    <br /><br /> 
                    <h1>{memo.mood}</h1>
                    <div className='p-body pl-2 pr-2'>
                        <h4>{memo.body}</h4>
                    </div>
                    <h5 style={{ opacity: '.3'}}>{memo.user} on {new Date(memo.createdAt).toLocaleDateString()} at {new Date(memo.createdAt).toLocaleTimeString()}</h5>
                    <br /> 

                    {
                        memo.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{memo.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div className="d-flex">{comment.user}</div>
                                    <br /> 
                                    <div className="d-flex">{comment.body}</div>
                                    <br /> 
                                    {comment.user === user &&
                                        <>
                                            <div className="d-flex flex-column pb-8">
                                                <button onClick={() => handleDeleteComment(comment)} className="btn btn-outline-danger pl-9">x</button>
                                            </div>
                                            <br />
                                            <br /> 
                                            <div className="d-flex flex-column">
                                                <Link to={`/memo/${memo._id}/comments/${comment._id}`} style={{ textDecoration: 'none', margin: "2px", padding: "2px" }}>
                                                    <span>+</span>
                                                </Link>
                                            </div>
                                            <br /> <br /> 
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
                            {/* <summary style={{ opacity: '.5' }}>add a comment:</summary> */}
                           
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="clr">add a comment:</label><br />
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button>add</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {memo.user === user &&
                            <>
                                <button onClick={handleDeleteMemo}>Delete</button>
                                <Link to={`/memo/${memo._id}/edit`} style={{ textDecoration: 'none' }}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/memo' style={{ textDecoration: 'none' }}>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show