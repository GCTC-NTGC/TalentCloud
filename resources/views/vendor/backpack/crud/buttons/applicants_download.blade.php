@if ($crud->hasAccess('update') && ($entry->status() === 'published' || $entry->status() === 'closed'))
<br /><a href="{{ route('admin.jobs.download.applicants', $entry->id) }} " download class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Download Applicants</a>
@endif
