import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function EditTask() {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [task, setTask] = useState({ title: "" });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axios.get(`/api/tasks/${taskId}`);
                const res = data.tasks[0].title
                setTask({
                    ...task,
                    title: res,
                });
            } catch (error) {
                // console.error('Error fetching task:', error);
                toast.error('Error fetching task');
            }
        };

        fetchTask();
    }, [taskId]);
    // const updateTask = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.put(`/api/tasks/${taskId}`, task); 
    //         toast.success('Task updated successfully');
    //         navigate('/'); 
    //     } catch (error) {
    //         toast.error('Error updating task');
    //     }
    // };

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen py-8 px-4">
            <Link className="flex items-center text-blue-500 mb-4" to="/">
                <BsArrowLeftShort className="mr-2" />
                Home
            </Link>
            <div>
                <h1 className="text-2xl font-bold mb-4">Edit task</h1>
                <form onSubmit={updateTask}>
                    <label className="block mb-4">
                        <span className="text-gray-400">Task Title:</span>
                        <input
                            name="title"
                            type="text"
                            placeholder="Task Title"
                            required
                            value={task.title}
                            onChange={handleChange}
                            className="block w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                </form>
            </div>
        </div>
    );
}

export default EditTask;
