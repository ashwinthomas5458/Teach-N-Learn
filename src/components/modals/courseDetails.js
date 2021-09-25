import React from 'react';

const CourseDetails =({details})=>{
  return(
    <div class=" modal fade t-course-details-modal" id="courseDetailsModal" tabindex="-1" aria-labelledby="courseDetailsModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{details? details.course_name : "Course Details"}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="container">
            {
               details?
               <div className="row">
                   <div className="col-lg-12 py-3">
                       <p className="mb-0 pb-3">{details.details}</p>
                       <p className="mb-0 pb-3">Classes per month: <span className="fw-bold">{details.hours_of_class_per_month? `${details.hours_of_class_per_month} hours`: "--"}</span></p>
                       {
                           details.skills_required && details.skills_required.length?
                           <>
                           <p className="mb-0 pb-3 fw-bold">Skills Required</p>
                           <ul className="px-3">
                               {
                                 details.skills_required.map((item, i)=>(
                                     <li key={`skill-${i}`}>{item}</li>
                                 ))  
                               }
                           </ul>
                           </>
                           :
                           null                           
                       }
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

export default CourseDetails;