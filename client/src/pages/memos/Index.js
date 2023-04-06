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
                <h1>Index View</h1>
                <div id="memos">
                        {memos?.map((memo, index) => 
                            <Link to={`/memo/${memo._id}`} key={index}>
                                <div className="a-memo">
                                    {memo.subject}
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