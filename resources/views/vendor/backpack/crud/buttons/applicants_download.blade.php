@if ($crud->hasAccess('update') && ($entry->isPublic() && ($entry->submitted_applications_count() > 0)))
<br /><a href="{{ route('admin.jobs.download.applicants', $entry->id) }} " download class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Download Applicants</a>
@endif
