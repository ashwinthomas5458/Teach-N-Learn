import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { PrimaryButton, SecondaryButton } from '../../components/cta';
import { Input } from '../../components/form';
import ConfirmationModal from '../../components/modals/confirmationModal';
import CourseDetails from '../../components/modals/courseDetails';
import { DataContext } from '../../context/dataContext';
import APIGet from '../../hooks/get';

const Register = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [mail, setMail] = useState('');
    const [age, setAge] = useState('');
    const [hours, setHours] = useState('');
    const [courseSelection, setCourseSelection] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [view, setView] = useState(null);
    const [error, setError] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [data, setData] = useState(null);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const [courseDetails, setCourseDetails] = useContext(DataContext);

    const router = useHistory();

    /* Number Validation Function */
    const numberValidation = (number) => {
        let isNum = /^\d+$/.test(number);
        if (isNum && number > 0) return true;
        else return false;
    }

    /* Mail Validation Function */
    const mailValidation = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
        else return false
    }

    /* Add or remove a selected course */
    const addCourse = (e, i) => {
        if (!e.target.classList.contains('t-view-more')) {
            let selected = [...selectedCourses];
            let index = selected.indexOf(i);
            if (index === -1) selected.push(i);
            else selected.splice(index, 1);
            setSelectedCourses(selected);
        }
    }

    const getCourseData=async()=>{
        let courseData = [];
        if(courseDetails) courseData=[...courseDetails];
        else {
            let url = "https://60311c91081a010017546ce1.mockapi.io/api/courses";
            let response = await APIGet(url);
            if(response){
                courseData = response;
                setCourseDetails(response);
            }
        }
        return courseData;
    }

    /* Submit Handler */
    const handleSubmit = (e) => {
        e.preventDefault();
        let selected = [...selectedCourses];
        let coursesSelected = [];
        selected.forEach(item => {
            let course = courses[item - 1];
            coursesSelected.push(course);
        });
        let data = {
            child_name: name,
            parent_number: number,
            parent_email: mail,
            child_age: age,
            hours_per_month: hours,
            courses_selected: coursesSelected
        };
        setData(data);
        let bootstrap = window.bootstrap;
        let confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmationModal.show();
    }

    const completeRegistration = (e) => {
        e.preventDefault();
        let postData = JSON.stringify({ ...data });
        let bootstrap = window.bootstrap;
        let confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
        confirmationModal.toggle();
        setRegistrationComplete(true);
    }

    const handleNext = async (e) => {
        e.preventDefault();
        let ageValid = numberValidation(age);
        let phoneValid = numberValidation(number) && number.length === 10;
        let emailValid = mailValidation(mail);
        let hoursValid = numberValidation(hours);
        if (ageValid && phoneValid && emailValid && hoursValid) {
            setCourseSelection(true);
            setLoader(true);
            let data = [];
            let courseData = await getCourseData();
            if(courseData){
                courseData.forEach(item => {
                    if (item.hours_of_class_per_month <= hours) data.push(item);
                });
            }
            setCourses(data);
            setLoader(false);
        }
        else {
            setError("Enter valid details!");
        }
    }

    useEffect(() => {
        setError(null);
    }, [name, age, number, hours, mail]);

    return (
        <>
            <div className="t-register-wrapper t-enlarge-in">
                <div className="t-register-container container t-fade-in">
                    <div className="row justify-content-center t-margin-y-20">
                        {
                            !registrationComplete ?
                                <div className="col-lg-10 text-center">
                                    <h3 className="mb-0">Register</h3>
                                </div>
                                :
                                null
                        }
                        <div className={!registrationComplete ? "col-lg-8 col-sm-10 col-12 pt-5" : "col-lg-8 col-sm-10 col-12"}>
                            {
                                !courseSelection && !registrationComplete ?
                                    <div className="t-form-wrapper w-100">
                                        <form className="p-4">
                                            <div className="row">
                                                <div className="col-lg-12 pb-4">
                                                    <h4 className="mb-0">Basic Details</h4>
                                                </div>
                                                <div className="col-lg-12">
                                                    <Input
                                                        label="Child's Name*"
                                                        type="text"
                                                        value={name}
                                                        valueChange={setName}
                                                        placeholder="Full name"
                                                        required={true} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <Input
                                                        label="Parent's Number*"
                                                        type="number"
                                                        value={number}
                                                        valueChange={setNumber}
                                                        placeholder="0000 000 000"
                                                        required={true} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <Input
                                                        label="Parent's Email*"
                                                        type="email"
                                                        value={mail}
                                                        valueChange={setMail}
                                                        placeholder="Parent's mail ID"
                                                        required={true} />
                                                </div>
                                                <div className="col-lg-4">
                                                    <Input
                                                        label="Age*"
                                                        type="number"
                                                        value={age}
                                                        valueChange={setAge}
                                                        placeholder="Child's age"
                                                        required={true} />
                                                </div>
                                                <div className="col-lg-6">
                                                    <Input
                                                        label="Hours available*"
                                                        type="number"
                                                        value={hours}
                                                        valueChange={setHours}
                                                        placeholder="Hours per month"
                                                        required={true} />
                                                </div>
                                                {
                                                    error ?
                                                        <div className="col-lg-12 pt-3">
                                                            <p className="t-error fw-bold">{error}</p>
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className="col-lg-12 pt-3">
                                                    {
                                                        name && number && mail && age && hours && !error ?
                                                            <PrimaryButton name="Next" fullWidth={true} click={handleNext} />
                                                            :
                                                            <PrimaryButton name="Next" fullWidth={true} disabled={true} />
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    : registrationComplete ?
                                        <div className="t-form-wrapper w-100">
                                            <div className="container d-flex flex-column align-items-center py-5 t-no-data">
                                                <div className="t-success-illustration"></div>
                                                <h3 className="fw-bold mb-0 pb-2 text-center">Registration Successful.</h3>
                                                <h5 className="fw-bold text-center px-5 pb-4">Congratulation. You have successfully completed your registration.</h5>
                                                <div className="w-100">
                                                    <PrimaryButton name="Back to home" fullWidth={true} click={() => { router.push('/') }} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="t-form-wrapper w-100">
                                            <form className="p-4">
                                                <div className="row">
                                                    <div className="col-lg-12 pb-4">
                                                        <h4 className="mb-0">Select Courses</h4>
                                                    </div>
                                                    {
                                                        loader ?
                                                            <div className="col-lg-12 py-5">
                                                                <div className="pt-4 pb-5 w-100 d-flex justify-content-center my-5">
                                                                    <div className="t-loader"></div>
                                                                </div>
                                                            </div>
                                                            :
                                                            courses && courses.length ?
                                                                <>
                                                                    <div className="col-lg-12 pb-4 pt-2">
                                                                        <div className="row gy-4">
                                                                            {
                                                                                courses.map((item, i) => {
                                                                                    return (
                                                                                        <div className="col-lg-6" key={`course-card-${i}`}>
                                                                                            <div className={selectedCourses.indexOf(i + 1) != -1 ? "t-courses-card w-100 t-card-active position-relative" : "t-courses-card w-100 position-relative"} onClick={(e) => addCourse(e, i + 1)}>
                                                                                                <h5 className="mb-0 pb-3 pe-4">{item.course_name}</h5>
                                                                                                <p className="mb-0 pb-3">Classes per month: <span className="fw-bold">{item.hours_of_class_per_month ? `${item.hours_of_class_per_month} hours` : "--"}</span></p>
                                                                                                <div className="w-100 text-end">
                                                                                                    <span className="t-view-more fw-bold" data-bs-toggle="modal" data-bs-target="#courseDetailsModal" onClick={() => setView({ ...item })}>View Details</span>
                                                                                                </div>
                                                                                                <svg className="t-selected-icon position-absolute" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M0.5 8.0001C0.5 3.86501 3.86462 0.5 8.00002 0.5C12.1351 0.5 15.5 3.86506 15.5 8.0001C15.5 12.1352 12.1352 15.5 8.00002 15.5C3.8646 15.5 0.5 12.1352 0.5 8.0001ZM0.761913 8.0001C0.761913 11.9914 4.00838 15.2381 8.00002 15.2381C11.9917 15.2381 15.2381 11.9914 15.2381 8.0001C15.2381 4.00855 11.9916 0.762139 8.00002 0.762139C4.00839 0.762139 0.761913 4.00855 0.761913 8.0001Z" fill="#FF8787" stroke="#FF8787" />
                                                                                                    <path d="M6.35966 10.5134L6.70851 10.7663L7.01016 10.4586L12.1664 5.19913C12.1665 5.1991 12.1665 5.19904 12.1666 5.19901C12.2539 5.11003 12.3964 5.10924 12.4844 5.19586L12.4848 5.19629C12.574 5.28385 12.5754 5.42715 12.4879 5.51632L12.4878 5.51641L6.89412 11.2221L6.89379 11.2224C6.85065 11.2665 6.79318 11.2895 6.7335 11.2895C6.68683 11.2895 6.64132 11.2755 6.6018 11.2468L6.60162 11.2467L3.54093 9.02805C3.44006 8.95488 3.41703 8.81335 3.49022 8.71163C3.56381 8.61051 3.70473 8.58865 3.80477 8.66118L3.80478 8.66119L6.35966 10.5134Z" fill="#FF8787" stroke="#FF8787" />
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 pt-3">
                                                                        <div className="w-100 h-100 d-flex align-items-center justify-content-end">
                                                                            <span className="t-text-btn px-4" onClick={() => setCourseSelection(false)}>Back</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 pt-3">
                                                                        {
                                                                            name && number && mail && age && hours && selectedCourses.length ?
                                                                                <PrimaryButton name="Submit" fullWidth={true} click={handleSubmit} />
                                                                                :
                                                                                <PrimaryButton name="Submit" fullWidth={true} disabled={true} />
                                                                        }
                                                                    </div>
                                                                </>
                                                                :
                                                                <div className="col-lg-12">
                                                                    <div className="w-100 d-flex flex-column align-items-center t-no-data pb-4">
                                                                        <div className="t-not-found-illustration"></div>
                                                                        <h5 className="fw-bold text-center px-5 pb-4">No courses found. Please try after sometime or try changing the hours available.</h5>
                                                                        <div className="w-100">
                                                                            <SecondaryButton name="Back" fullWidth={true} click={() => setCourseSelection(false)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CourseDetails details={view} />
            <ConfirmationModal details={data} handleSubmit={completeRegistration} />
        </>
    )
}

export default Register;