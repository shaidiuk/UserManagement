import React, { useState, useEffect } from 'react';
// import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRegister, fetchUserUpdate, formUpdated } from '../../store/userSlice';

function RegistrationForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const user = userState.user;

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formEditing, setFormEditing] = useState(false);


    // const isLoading = useSelector(state => state.spinner.isLoading);

    const isViewMode = userState.isLogin === true;
    const isEditMode = formEditing;
    const isRegistrationMode = userState.isLogin === false;

    const handleChange = (e) => {
        dispatch(formUpdated({ key: e.target.name, value: e.target.value }));
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        // Clear the success message after 10 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 10000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        // Validate password email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(user.email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Validate password length
        if (user.password.length < 8) {
            setErrorMessage('Password must have a minimum of 8 characters.');
            return;
        }

        // Validate password and confirmPassword match
        if (user.password !== user.passwordConfirmation) {
            setErrorMessage('Password and Confirm Password must match.');
            return;
        }

        try {
            if (isEditMode) {
                await dispatch(fetchUserUpdate(user));
                showSuccessMessage('User successfully saved!');
            } else {
                await dispatch(fetchUserRegister(user));
                showSuccessMessage('Account created successfully!');
            }
            setFormEditing(false);
        } catch (error) {
            console.log("error", error)
            setErrorMessage('Something went wrong, please try again later');
        }
    };

    return (
        <>
            {/* {isLoading ? <Spinner /> : null} */}
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={isEditMode === true || isRegistrationMode === true ? false : true}>
                            <div className="container">
                                <h2 className="text-center mb-5">Registration Form</h2>
                                {/* Personal Information */}
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input value={user.firstName} onChange={handleChange} type="text" className="form-control" id="firstName" name="firstName" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="name" className="form-label">Last Name</label>
                                        <input value={user.lastName} onChange={handleChange} type="text" className="form-control" id="name" name="lastName" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select value={user.gender} onChange={handleChange} className="form-select" id="gender" name="gender" required>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                                        <input value={user.dateOfBirth} onChange={handleChange} type="date" className="form-control" id="dob" name="dateOfBirth" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input value={user.email} onChange={handleChange} type="email" className="form-control" id="email" name="email" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="phone" className="form-label">Telephone Number</label>
                                        <input value={user.phone} onChange={handleChange} type="tel" className="form-control" id="phone" name="phone" pattern="\d{10}" placeholder="XXXXXXXXXX" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input value={user.password} onChange={handleChange} type="password" className="form-control" id="password" name="password" required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                                        <input value={user.passwordConfirmation} onChange={handleChange} type="password" className="form-control" id="passwordConfirmation" name="passwordConfirmation" required />
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="civicAddress" className="form-label">Civic Address</label>
                                            <input value={user.civicAddress} onChange={handleChange} type="text" className="form-control" id="civicAddress" name="civicAddress" required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input value={user.city} onChange={handleChange} type="text" className="form-control" id="city" name="city" required />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="canadianProvince" className="form-label">Canadian Province</label>
                                            <select value={user.province} onChange={handleChange} className="form-select" id="canadianProvince" name="province" required>
                                                <option value="">Select Province</option>
                                                <option value="bc">British Columbia</option>
                                                <option value="ontario">Ontario</option>
                                                <option value="pei">Prince Edward Island</option>
                                                <option value="quebec">Quebec</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="postalCode" className="form-label">Canadian Postal Code</label>
                                            <input value={user.postalCode} onChange={handleChange} type="text" className="form-control" id="postalCode" name="postalCode" pattern="[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d" placeholder="e.g., X9X9X9" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        {!isEditMode && isViewMode ? <div className="d-flex justify-content-center">
                            <button type="button" onClick={() => setFormEditing(true)} className="btn btn-primary mb-3">
                                Edit
                            </button>
                        </div> : null}
                        {isEditMode ? <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary mb-3">
                                Save
                            </button>
                        </div> : null}
                        {!isEditMode && isRegistrationMode ? <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary mb-3">
                                Register
                            </button>
                        </div> : null}
                    </form>

                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                    {!userState.isLogin ? <p className="card-footer bg-transparent bottom-margin-alligne text-center">
                        "Don't have an account?
                        <button onClick={() => { navigate('/login'); }} className="btn btn-link">
                            Login
                        </button>
                    </p> : null }
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;