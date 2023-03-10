import React, { useState } from 'react'

export default function EventFuncHooks (){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`你输入的用户名是${username}，密码是${password}`)
    }

    const saveFormData = (dataType) =>{ 
        
        if (dataType === 'username'){
            return (e) => setUsername(username => username = e.target.value)
        }
        if (dataType === 'password'){
            return (e) => setPassword(password => password = e.target.value)
        }
            
    }

    /*  不使用函数柯里化 */
    // const saveFormData = (dataType, e) =>{ 
    //     if (dataType === 'username'){
    //         return setUsername(username => username = e.target.value)
    //     }
    //     if (dataType === 'password'){
    //         return setPassword(password => password = e.target.value)
    //     }
    // } 

    return (
        <form onSubmit={handleSubmit}>
        {/* <form onSubmit={e => {
                e.preventDefault()
                alert(`你输入的用户名是${username}，密码是${password}`)
            }
        }> */}

            用户名: <input onChange={saveFormData('username')} type="text" name="username" />
            密码: <input onChange={saveFormData('password')} type="password" name="password" />
            {/* 用户名: <input onChange={e => saveFormData('username', e)} type="text" name="username" />
            密码: <input onChange={e => saveFormData('password', e)} type="password" name="password" /> */}
            <button>登录</button>
        </form>
    )
}