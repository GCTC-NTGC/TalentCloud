@if ($crud->hasAccess('update') && ($entry->isEditable()))
<a href="{{ route('admin.jobs.edit', $entry->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>Questions</a>
@endif
