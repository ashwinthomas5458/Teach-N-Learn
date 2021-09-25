import React from 'react';
import { PrimaryButton } from '../cta';

const ConfirmationModal =(props)=>{
  return(
    <div class=" modal fade t-course-details-modal" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Confirm Submission</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="container">
            {
               props.details?
               <div className="row">
                   <div className="col-lg-12 py-3">
                        <h4 className="mb-0 pb-4">Registration Details</h4>
                    </div>
                    <div className="col-lg-6">
                        <p className="mb-0 pb-3">Name: <span className="fw-bold">{props.details.child_name} </span></p>
                    </div>
                    <div className="col-lg-6">
                        <p className="mb-0 pb-3">Age <span className="fw-bold">{props.details.child_age} Years </span></p>
                    </div>
                    <div className="col-lg-6">
                        <p className="mb-0 pb-3">Parent's Number: <span className="fw-bold">{props.details.parent_number} </span></p>
                    </div>
                    <div className="col-lg-6">
                        <p className="mb-0 pb-3">Parent's Email: <span className="fw-bold">{props.details.parent_email} </span></p>
                    </div>
                    <div className="col-lg-12">
                       <p className="mb-0 pb-3">Availability: <span className="fw-bold">{props.details.hours_per_month? `${props.details.hours_per_month} hours per month`: "--"}</span></p>
                       {
                           props.details.courses_selected && props.details.courses_selected.length?
                           <>
                           <p className="mb-0 pb-3 fw-bold">Courses Selected</p>
                           <ul className="px-3">
                               {
                                 props.details.courses_selected.map((item, i)=>(
                                     <li key={`course-${i}`}>{item.course_name}</li>
                                 ))  
                               }
                           </ul>
                           </>
                           :
                           null                           
                       }
                   </div>
                   <div className="col-lg-6"></div>
                   <div className="col-lg-6 pt-4">
                    <PrimaryButton name="Submit" fullWidth={true} click={props.handleSubmit}/>
                   </div>
               </div> 
               :
               null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal;