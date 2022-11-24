import React from 'react'
import Button from './button.component';

function LoginPage() {
  return (
    <>
        
        <h1>Welcome to DegreeActually Works</h1>
        <div>
            <form action='POST'>
                <label for="email">GT Email</label>
                <input name="email" type="text" />
                <label for="password">Password</label>
                <input name="password" type="password" />
            </form>
            <Button>Login</Button>
        </div>

    </>
  )
}

export default LoginPage;