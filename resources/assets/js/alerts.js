const Swal = require('sweetalert2');

// Manager Index ==========================================
function handleClick(e) {
    e.preventDefault();
    const action = this.getAttribute('data-action');

    let alertConfig = {
        delete: {
            title: 'Delete this draft Job Poster?',
            confirmButtonText: 'Delete',
            success: {
                title: 'Deleted',
                text: 'The draft has been successfully removed.'
            }
        },
        review: {
            title: 'Send this Job Poster for Review?',
            confirmButtonText: 'Send to Talent Cloud',
            success: {
                title: 'Sent!',
                text: 'Your Job Poster has been sent to Talent Cloud for review.'
            }
        }
    };

    alertConfig = alertConfig[action];

    Swal.queue([{
        title: alertConfig.title,
        text: 'This action cannot be undone.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0A6CBC',
        cancelButtonColor: '#F94D4D',
        confirmButtonText: alertConfig.confirmButtonText,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return axios({
                    method: action == 'delete' ? action : 'post',
                    url: this.getAttribute('href')
                })
                .then(response => {
                    const jobId = this.getAttribute('data-jobid');
                    const jobMarkup = indexWrapper.querySelector(`div[data-jobid="${jobId}"]`);
                    jobMarkup.outerHTML = response.data;
                })
                .then(() => {
                    Swal.insertQueueStep({
                        title: alertConfig.success.title,
                        text: alertConfig.success.text,
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
// 'Send for Review' and 'Delete' buttons, and register the click event handler
// defined above.
if (typeof (indexWrapper) != 'undefined' && indexWrapper != null) {
    const reviewButtons = Array.from(indexWrapper.querySelectorAll('a[data-action="review"]'));
    reviewButtons.forEach(button => button.addEventListener('click', handleClick));

    const deleteButtons = Array.from(indexWrapper.querySelectorAll('button[data-action="delete"]'));
    deleteButtons.forEach(button => button.addEventListener('click', handleClick));
}
// End Manager Index ======================================
