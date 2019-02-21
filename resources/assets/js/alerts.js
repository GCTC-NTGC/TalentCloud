const Swal = require('sweetalert2');

// Manager Index ==========================================
function handleReview(e) {
    // Prevent the anchor tag from navigating
    e.preventDefault();
    // Create a 'queue' of alerts, which depend on the Axios
    // promise resolving.
    Swal.queue([{
        title: 'Send this Job Poster for Review?',
        text: 'This action cannot be undone.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0A6CBC',
        cancelButtonColor: '#F94D4D',
        confirmButtonText: 'Send to Talent Cloud',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return axios.post(this.getAttribute('href'))
                .then(response => {
                    const jobId = this.getAttribute('data-jobid');
                    const jobMarkup = indexWrapper.querySelector(`div[data-jobid="${jobId}"]`);
                    jobMarkup.outerHTML = response.data;
                })
                .then(() => {
                    Swal.insertQueueStep({
                        title: 'Sent!',
                        text: 'Your Job Poster has been sent to Talent Cloud for review.',
                        type: 'success'
                    });
                })
                .catch(() => {
                    Swal.insertQueueStep({
                        title: 'Error',
                        text: 'Something went wrong, please try again later.',
                        type: 'error'
                    });
                });
        }
    }]);
}

const indexWrapper = document.querySelector('.manager-poster-index');
// Double check we're on the manager index page, grab all the
// 'Send for Review' buttons, and register the click event handler
// defined above.
if (typeof (indexWrapper) != 'undefined' && indexWrapper != null) {
    const reviewButtons = Array.from(indexWrapper.querySelectorAll('a[data-action="review"]'));
    reviewButtons.forEach(button => button.addEventListener('click', handleReview));
}
// End Manager Index ======================================
