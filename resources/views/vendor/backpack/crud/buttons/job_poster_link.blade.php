@if ($crud->hasAccess('update') && $entry->isEditable())
<a href="{{ route('manager.jobs.show', $entry->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>View</a>
@endif
