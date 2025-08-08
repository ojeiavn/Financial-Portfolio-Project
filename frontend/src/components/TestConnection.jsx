import React, {useEffect, useState} from "react";

const TestConnection = () => {
    const [msg, setMsg] = useState("checking connection..")


    useEffect(() => {
        fetch("http://172.30.0.198:5000/users" || "http://localhost:5000/users")
        .then((res) => {
            if(!res.ok) throw new Error("Networkreposnse not ok");
            return res.text();
        })
        .then(data=> setMsg("Backend says " + data))
        .catch(err => setMsg("Failed to connect "+err));
    }, []);

    return (
        <>{msg}</>
    )
}

export default TestConnection;