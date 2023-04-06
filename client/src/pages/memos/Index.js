import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllMemos } from "../../services/memoService"

function Index({ user }) {
    const [memos, setMemos] = useState([])
    useEffect(() => {
        async function loadData() {
            const data = await getAllMemos()
            setMemos(data)
        }
        loadData()
    }, [])
    console.log(memos)
    return (
            <div>
                <h1>Memos</h1><br /> <br />
                <div id="memos">
                        {memos?.map((memo, index) => 
                            <Link to={`/memo/${memo._id}`} key={index}>
                                <div className="a-memo">
                                    <h1>{memo.mood}</h1>
                                    <br /> <br />
                                    <h4>{new Date(memo.createdAt).toLocaleDateString()}</h4> 
                                    <br /><br/> 
                                </div>
                            </Link>
                        )}
                    {user && 
                        <Link to="/memo/new">
                            <button>NEW MEMO</button>
                        </Link>
                    }
                </div>
            </div>
    )
}

export default Index