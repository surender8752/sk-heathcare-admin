import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    const handleDelete = (docId, docName) => {
        setDeleteConfirm({ id: docId, name: docName })
    }

    const confirmDelete = async () => {
        if (deleteConfirm) {
            await deleteDoctor(deleteConfirm.id)
            setDeleteConfirm(null)
        }
    }

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {
                    doctors.map((item, index) => (
                        <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group relative' key={index}>
                            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                            <div className='p-4'>
                                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                                <div className='mt-2 flex items-center gap-1 text-sm'>
                                    <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                                    <p>Available</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item._id, item.name)}
                                    className='mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md transition-all duration-300'
                                >
                                    Delete Doctor
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl'>
                        <h2 className='text-lg font-semibold text-gray-800 mb-2'>Confirm Delete</h2>
                        <p className='text-gray-600 mb-4'>
                            Are you sure you want to delete <span className='font-medium text-red-500'>{deleteConfirm.name}</span>? This action cannot be undone.
                        </p>
                        <div className='flex gap-3'>
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-all'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-all'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorsList
