import React, { useEffect, useState } from 'react'
import taskimage from '../assets/task.png'
import add from '../assets/add.png'
import Task from '../components/task'
import TaskForm from '../components/TaskForm'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const AdminDashboard = ({ adminToken , setAdminToken}) => {

    const [allTasks, setAllTasks] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const allTasksFinder = async () => {
        try {
            const response = await axios.post(backendUrl + '/admin/getalltasks', {}, { headers: { adminToken } })


            if (response.data.success) {
                setAllTasks(response.data.allTasks);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        allTasksFinder();
        if (!adminToken) {
            navigate('/', { replace: true });
        }
    }, [adminToken, allTasks])

    
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setAdminToken('')
        navigate('/');
    };


    return (
        <div >
            <div className='ml-10 mr-10 '>
                {/* Navbar */}
                <div className='flex items-center justify-between '>
                    <div className='inline-flex items-center gap-2 '>
                        <img className='h-20' src={taskimage} alt="" />
                        <p className='prata-regular text-3xl'>Admin Dashboard</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 flex gap-0.5">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>

                        Logout
                    </button>
                </div>

                <div className='flex justify-between mt-10 '>
                    {/* left side */}
                    <div className='w-full '>
                        {
                            allTasks.length === 0 ? (
                                <div className='flex h-full justify-center items-center w-full'>
                                    <p >Create your first Task</p>

                                </div>

                            ) : (
                                <div className='grid grid-cols-3 gap-5  max-w-4xl'>
                                    {
                                        allTasks.map((task, index) => {
                                            return (<Task key={index} task={task} />)
                                        })
                                    }
                                </div>
                            )
                        }

                    </div>


                    {/* right side */}
                    <div className='ml-10'>
                        <TaskForm adminToken={adminToken} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboard