import React from "react";
import axios from "axios";
import Table from "./Table";
import AddedGroupMembers from "./AddedGroupMembers";
import moment from "moment";

export default function AddingConversation(props) {

    
    function indexesofMembers(array) {
        const array_new = array.map(pre => {
            return pre.idusers
        })
        return array_new
    }

    const [query, setQuery] = React.useState("")
    const [addedMembers, setAddedMembers] = React.useState([])

    const [addingConv, setaddingConv] = React.useState({
        conversation_name: "",
        group_members_ids: []
    })

    const keys = ["first_name", "last_name", "username"]


    const [fetchAllUsers, setAllUsers] = React.useState([])

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(`/chat/users?q=${query}`)
                setAllUsers(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        
        if(query.length ===0 || query.length > 2) fetchData()
        
    }, [query])

    React.useEffect(() => {
        setaddingConv( prev => {
            return (
                {
                    ...prev,
                    group_members_ids: indexesofMembers(addedMembers)
                }
            )
        }
            
    )

    }, [addedMembers])




    function handleChange (e) {
        setQuery( prev => prev = e.target.value)
            
        
    }

    function handleAddingConv(e) {
        setaddingConv(prev => {
            return (
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        })
    }

    function handleAddingGroupmembers (user) {
        setAddedMembers((prev) => {
            const array= indexesofMembers(prev)
           

            if (array.includes(user.idusers) )
                return ([...prev])

            return (            
               [...prev, user]
            )
        })
    }


    function handleDeleteGroupMembers (user) {
        setAddedMembers((prev) => {
            const array= indexesofMembers(prev)
           

            if (array.includes(user.idusers) ){
                const indexElement = array.indexOf(user.idusers)
                if (indexElement === 0)
                    return prev.shift()

                return (prev.splice(indexElement, indexElement))
            }

           
                

            return (            
               [...prev]
            )
        })
    }


   async function createConversation () {
        try {
            const res = await axios.post(`/chat/create_conversation`, {...addingConv, joined_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")})
            props.handleClose()
        }
        catch (err) {
            console.log(err)
        }

    }

  
console.log(addedMembers)

console.log(addingConv)
/*
function search (data) {
    return data.filter((item) => (
        keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    ))
}
*/

    return (
        <div className="add-new-conversation">
                <div className="closing-icon" onClick={() => props.handleClose()}>
                    <span className="hamburger-top-line"></span>
                    <span className="hamburger-middle-line"></span>
                    <span className="hamburger-bottom-line"></span>
                </div>
                <h2>Add new coversation</h2>
                <label htmlFor="conversation_name">Add a name to the conversation</label>
                <input id="conversation_name" type="text" name="conversation_name" value={addingConv.conversation_name} onChange={handleAddingConv} placeholder="conversation name"/>
                <AddedGroupMembers members = {addedMembers} handleDelete ={handleDeleteGroupMembers}/>
                <label htmlFor="search">Add a member to the conversation</label>
                <input id="search" type="text" placeholder="Search for users" name="search" value={query} onChange={handleChange} />

                {
                    fetchAllUsers.length > 0  ? 
                        
                        <Table users = {fetchAllUsers}  addingMembers = {handleAddingGroupmembers}/>
                        
                        

                    :
                    <div>Loading... or no match is found</div>
                }
                
                <button onClick={createConversation}>Create conversation</button>
        </div>
    )
}



