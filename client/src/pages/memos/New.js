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
                {/* <input type="text" id="nme" ref={moodRef} /><br /><br /> */}
                <select
                        class="form-select"
                        aria-label="Default select example"
                        name="mood"
                        ref={moodRef}
                    >
                    {/* <option selected>mood:</option> */}
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

                <label htmlFor="clr">Description:</label><br />
                <textarea id="clr" cols="5" rows="5" ref={bodyRef} /><br /><br />

                <button>Submit</button>
            </form>
        </div>
     );
}

export default New;