import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createMemo } from "../../services/memoService";

function New({ user }) {
    let moodRef = useRef()
    let bodyRef = useRef()
    let navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        let memo = {
            mood: moodRef.current.value,
            body: bodyRef.current.value,
            user
        }
        await createMemo(memo)
        navigate('/memo')
    }
    return ( 
        <div>
            <h1>New Memo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nme">Mood:</label><br />
                <input type="text" id="nme" ref={moodRef} /><br /><br />

                <label htmlFor="clr">Body:</label><br />
                <textarea id="clr" cols="10" rows="10" ref={bodyRef} /><br /><br />

                <button>Submit</button>
            </form>
        </div>
     );
}

export default New;