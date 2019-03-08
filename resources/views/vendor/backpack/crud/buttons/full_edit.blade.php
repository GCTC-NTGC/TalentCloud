@if ($crud->hasAccess('update') && $entry->status() === 'draft')
<a href="{{ route('manager.jobs.edit', $entry->id) }} " class="btn btn-xs btn-default"><i class="fa fa-edit"></i> Full Edit</a>
@endif
