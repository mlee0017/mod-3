import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getMemo, updateMemo } from '../../services/memoService'

function Edit() {
    const [memo, setMemo] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    const moodRef = useRef()
    useEffect(() => {
        getMemo(params.id).then(data => setMemo(data))
    }, [params.id])
    async function handleSubmit(e) {
        e.preventDefault()
        let updatedMemo = {
            mood: moodRef.current.value,
            body: bodyRef.current.value
        }
        await updateMemo(memo._id, updatedMemo)
        navigate(`/memo/${memo._id}`)
    }
    console.log(memo)
    return ( 
        <div>
            <h1>Edit Memo</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="mood">mood:</label><br />
                    <input type="text" id="mood" ref={moodRef} defaultValue={memo.mood} /><br /><br />
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        name="mood"
                    >
                    <option selected>mood:</option>
                    <option value="(づ￣ ³￣)づ">(づ￣ ³￣)づ</option>
                    <option value="(｡¬‿¬｡)">(｡¬‿¬｡)</option>
                    <option value="┬──┬ /( ゜-゜/)">┬──┬ /( ゜-゜/)</option>
                    <option value="(╯°□°）╯︵ ┻━┻">(╯°□°）╯︵ ┻━┻</option>
                    <option value="(ಥ﹏ಥ)">(ಥ﹏ಥ)</option>
                    <option value="ᕦ(ò_óˇ )ᕤ">ᕦ(ò_óˇ )ᕤ</option>
                    <option value="┴┬┴┤(･_├┬┴┬">┴┬┴┤(･_├┬┴┬</option>
                    <option value="(;´༎ຶД༎ຶ`)">(;´༎ຶД༎ຶ`)</option>
                    <option value="(♥‿♥ ✿)">(♥‿♥ ✿)</option>
                    <option value="(ಠ╭╮ಠ)">(ಠ╭╮ಠ)</option>
                    <option value="(◕‿◕✿)">(◕‿◕✿)</option>
                    <option value="( ⚆ _ ⚆ )">( ⚆ _ ⚆ )</option>
                    <option value="(~˘▾˘)~">(~˘▾˘)~</option>
                    </select>
                    <br /><br /> 
                    <button>Submit</button>
                    <br /> 
                </form>
                <Link to={`/memo/${memo._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;